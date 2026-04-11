import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js';
import {toast} from "react-hot-toast";

export const authStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,

    signup: async (formData) => {
        set({isSigningUp: true})
        try{
            const res = await axiosInstance.post("/auth/signup", formData)
            set({authUser: res.data})
            toast.success("Account Created")
        }catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp: false})
        }
    },

    checkAuth : async() => {
        try{
            const res = await axiosInstance.get("/auth/protected");
            set({authUser: res.data});
            console.log("success:", res.data);

        } catch(error){
            console.log('error in checkAuth', error);
            set({authUser: null})
        } finally{
            set({isCheckingAuth: false})
        }
    },

}));