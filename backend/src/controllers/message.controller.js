import User from '../models/User.js';
import Message from '../models/Message.js';
import cloudinary from '../lib/claudinary.js';


export const getContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "Failed to fetch contacts" });
    }   
};

export const getChats = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const {id: contactId} = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId, receiverId: contactId },
                { senderId: contactId, receiverId: loggedInUserId }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ message: "Failed to fetch chats" });
    } 
};

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const {id: receiverId} = req.params;
        const {text, image} = req.body;

        if (!text && !image) {
            return res.status(400).json({ message: "Message must contain text or image" });
        }
        
        let imageUrl;

        if(image){
            const UploadedImage = await cloudinary.uploader.upload(image);
            imageUrl = UploadedImage.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Failed to send message" });
    }

}; 
 

export const getFriends = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const chatPartnersMessages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });

        const chatPartners = [...new Set(chatPartnersMessages.map(msg => msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()))];
        const friends = await User.find({_id: { $in: chatPartners}}).select("-password");
        res.status(200).json(friends);
    } catch (error) {
        console.error("Error fetching friends:", error);
        res.status(500).json({ message: "Failed to fetch friends" });
    }
};