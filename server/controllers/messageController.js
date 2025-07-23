import mongoose from "mongoose";
import cloudinary from "../lib/cloudnary.js";
import Message from "../models/Message.model.js";
import User from "../models/User.model.js";
import { io, userSocketMap } from "../server.js";

export const getUserForSideBar = async (req, res) => {
    try {
        const userId = req.user._id;
        const fileredUsers = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        const unseenMessages = {};
        const promises = fileredUsers.map(async (user) => {
            const messages = await Message.find({ senderId: user._id, receiverId: userId, seen: false });
            if (messages.length > 0) {
                unseenMessages[user._id] = messages.length;
            }
        })
        await Promise.all(promises);
        return res.json({ sucess: true, users: fileredUsers, unseenMessages });
    } catch (err) {
        res.status(500).json({ sucess: false, message: "Error fetching users" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: selectedUserId } = req.params;
        const userId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: selectedUserId, receiverId: userId },
                { senderId: userId, receiverId: selectedUserId }
            ]
        }).sort({ createdAt: 1 });

        await Message.updateMany(
            { senderId: selectedUserId, receiverId: userId, seen: false },
            { $set: { seen: true } }
        );

        return res.json({ sucess: true, messages });
    } catch (err) {
        res.status(500).json({ sucess: false, message: "Error fetching messages" });
    }
}

export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params;

        await Message.findByIdAndUpdate(
            id,
            { seen: true },
        );

        return res.json({ sucess: true, message: "Messages marked as seen" });
    } catch (err) {
        res.status(500).json({ sucess: false, message: "Error marking messages as seen" });
    }
}

export const sendMessage = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { text, image } = req.body;
        const senderId = req.user._id;
        const receiverId = req.params.id;

        let imageUrl = null;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
                folder: "Quick_Chat_Messages",
                resource_type: "auto",
            });
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create([{
            senderId,
            receiverId,
            text,
            image: imageUrl
        }], { session });

        // If any error happens here, the message will be rolled back
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage[0]);
        }

        await session.commitTransaction(); // Confirm write
        session.endSession();

        return res.json({
            success: true,
            message: "Message sent successfully",
            data: newMessage[0],
        });
    } catch (err) {
        await session.abortTransaction(); // Roll back DB changes
        session.endSession();
        console.error("Error sending message:", err);
        res.status(500).json({ success: false, message: "Failed to send message" });
    }
};