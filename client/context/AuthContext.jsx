import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import io from "socket.io-client";

const backendUrl = import.meta.env.VITE_bACKEND_URL || "http://localhost:3000";
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    // Check if user is authenticated and connect to socket
    const checkAuth = async () => {
        try {
            const { data } = await axios.get('/api/auth/check');
            console.log('checkAuth data', data);
            if (data.success) {
                setAuthUser(data.user);
                connectSocket(data.user);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const connectSocket = (userData) => {
        if (!userData || socket?.connected) {
            return;
        }
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id,
            }
        });

        newSocket.connect();
        setSocket(newSocket);
        newSocket.on("getOnlineUsers", (usersIds) => {
            setOnlineUsers(usersIds);
        });
    }

    // login function 
    const login = async (state, credentials) => {
        try {
            const { data } = await axios.post(`/api/auth/${state}`, credentials);
            console.log('data', data);
            if (data.success) {
                setToken(data.token);
                localStorage.setItem("token", data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                setAuthUser(data.user);
                connectSocket(data.user);
                toast.success(data.message);
            }else{
                toast.error(data.message);
            }

        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong during login";
            toast.error(message);
        }
    }

    // logout function
    const logout = async () => {
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        axios.defaults.headers.common['Authorization'] = '';
        toast.success("Logged out successfully");
        if (socket) {
            socket.disconnect();
            setSocket(null);
        }
    }

    // Update user function
    const updateProfile = async (userData) => {
        try {
            const { data } = await axios.put('/api/auth/update-profile', userData);
            if (data.success) {
                setAuthUser(data.user);
                toast.success("Profile updated successfully");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        checkAuth();
    }, []);

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}