import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';


export const chatStore = create((set) => ({
    isUserLoading: false,
    isMessageLoading: false,
    contacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
  

    setActivetab: (tab) => {
        set({activeTab: tab})
    },

    setSelectedUser: (selectedUser) => {
        set({selectedUser})
    },

    getContacts: async() => {
        set({isUserLoading: true})
        try{
            const res = await axiosInstance.get("/messages/contacts")
            set({contacts: res.data})
        } catch(error){
            toast.error(error.response?.data?.message || "Failed to fetch contacts");
        } finally {
            set({isUserLoading: false}) 
        }
    },

    getChats: async() =>{
        set({isUserLoading: true})
        try{
            const res = await axiosInstance.get("/messages/chats")
            set({chats: res.data})
        } catch(error){
            toast.error(error?.response?.data?.message || "Failed to fetch chats");
        } finally {
            set({isUserLoading: false}) 
        }
    },

    getMessages: async(contactId) => {
        set({isMessageLoaading: true})
        try{
            const res = await axiosInstance.get(`/messages/${contactId}`)
            set({messages: res.data})
        } catch(error){
            toast.error(error?.response?.data?.message || "Failed to fetch messages");
        } finally {
            set({isMessageLoaading: false}) 
        }
    }
}))