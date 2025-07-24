import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();
export const ChatProvider = ({children}) =>{
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});
    const {socket, axios} = useContext(AuthContext);

    // all user for sidebar
    const getUsers = async () =>{
        try {
            const {data} = await axios.get('/api/messages/users');
            if(data.success){
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // function to get messages of selected user
    const getMessages = async (userId) => {
        try {
            const {data} = await axios.get(`/api/messages/${userId}`);
            if(data.success){
                setMessages(data.messages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // function to send message
    const sendMessage = async (message) => {
        try {
            const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`, message);
            if(data.success){
                setMessages(prev => [...prev, data.data]);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // function to subscribe to new messages
    const subscribeToNewMessages = () => {
        console.log("Subscribing to new messages for selectedUser:", socket);
        if(!socket) return;
        console.log("Socket is connected:", socket.connected);
        socket.on('newMessage', (message) => {
            console.log("New message received:", message);
            if(selectedUser && message.senderId === selectedUser._id){
                message.seen = true;
                setMessages(prev => [...prev, message]);
                axios.post(`/api/messages/mark/${message._id}`);
            }else{
                setUnseenMessages(prev => ({
                    ...prev,
                    [message.senderId]: (prev[message.senderId] || 0) + 1
                }));
            }
            
        });
    }

    // function to unsubscribe from new messages
    const unsubscribeFromNewMessages = () => {
        if(socket){
            socket.off('newMessage');
        }
    }

    useEffect(() => {
      subscribeToNewMessages();    
      return () => {
        unsubscribeFromNewMessages();
      }
    }, [socket, selectedUser]);
    

    const value = {
        messages,
        users,
        selectedUser,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>)
}