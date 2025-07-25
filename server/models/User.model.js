import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default: ""
    },
    bioText: {
        type: String,
        default: "Hi there! I am using Quick Chat App.",
    },
    lastSeen:{
        type:Date,
        
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;