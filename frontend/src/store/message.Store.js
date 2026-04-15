import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const chatStore = create(() => ({
    isUserLoading: false,
    isMessageLoaading: false,
    contacts: [],
    chats: [],
    messages: [],
    activeTab: "chat",
    selectedUser: null,
    isSoundLoading: localStorage.getItem("isSoundLoading") === "true",

    toggleSound: () => {
        localStorage.setItem("isSoundLoading", !get().isSoundLoading);
        set({isSoundLoading: !get().isSoundLoading});
    },

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
            const contatcs = res.data
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
            const chats = res.data
        } catch(error){
            toast.error(error.response?.data?.message || "Failed to fetch chats");
        } finally {
            set({isUserLoading: false}) 
        }
    }
}))