import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import connectDb from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';
import User from './models/User.model.js';

//create express app
const app = express();
const server = http.createServer(app);

//socket.io setup
export const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

// store online users
export const userSocketMap = {};

// handle socket connections
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", async () => {
        console.log(`User ${userId} disconnected`);
        await User.findByIdAndUpdate(userId, { lastSeen: Date.now() });
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});


// middleware setup
app.use(express.json({
    limit:'10mb'
}));

app.use(cors({
  origin: "*"
}));
app.use("/api/status",(req,res)=>{
    res.send("Server is running") ;
})

app.use('/api/auth',userRouter);
app.use('/api/messages',messageRouter);

connectDb();

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});