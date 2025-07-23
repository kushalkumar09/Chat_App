import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudnary.js";

// GET /api/users/:id
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user profile" });
    }
};

// POST /api/users/signup
export const userSignUp = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;
        if (!email || !fullName || !password)
            return res.status(400).json({ message: "All fields are required" });

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            fullName,
            password: hashedPassword,
        });

        const token = generateToken(user._id);

        res.status(201).json({
            sucess: true,
            message: "User created successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
            },
            token,
        });
    } catch (err) {
        res.status(500).json({ message: "Error creating user", sucess: false });
    }
};

// POST /api/users/login
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "Invalid email or password" });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch)
            return res.status(401).json({ message: "Invalid email or password" });

        const token = generateToken(user._id);

        res.json({
            sucess: true,
            message: "Login successful",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
            },
            token,
        });
    } catch (err) {
        res.status(500).json({ message: "Login error" });
    }
};

export const checkAuth = (req, res) => {
    res.json({ sucess: true, message: "User is authenticated", user: req.user });
};

// PUT /api/users/:id
export const updateUserProfile = async (req, res) => {
    try {
        const { fullName, bio, profilePic } = req.body;
        const userId = req.user._id;
        let updatedUser;
        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, { fullName, bio }, { new: true });
        } else {
            const upload = await cloudinary.uploader.upload(profilePic, {
                folder: "Quick_Chat_App",
                resource_type: "auto",
            });
            updatedUser = await User.findByIdAndUpdate(userId,
                { fullName, bio, profilePic: upload.secure_url },
                { new: true }
            );
        }

        if (!updatedUser)
            return res.status(404).json({ message: "User not found" });

        res.json({ success: true, user: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message, message: "Error updating profile" });
    }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser)
            return res.status(404).json({ message: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting user" });
    }
};
