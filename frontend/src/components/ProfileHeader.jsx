import React, { useState, useRef } from "react";
import { authStore } from "../store/auth.Store.js";
import { chatStore } from "../store/message.Store.js";
import { LogOut } from "lucide-react";

const ProfileHeader = () => {
  const { logout, authUser, updateProfile, isLoggingOut} = authStore();
  const { isSoundEnabled, toggleSound } = chatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="flex items-center justify-between pr-3">
      <div className="flex items-center gap-3 p-4">
        <div className="avatar online">
          <button
            className="relative overflow-hidden rounded-full size-14 group"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={selectedImg || authUser?.user?.profilePic || "/avatar.png"}
              alt="User image"
              className="object-cover size-full"
            />
            <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/50 group-hover:opacity-100">
              <span className="text-xs text-white">Change</span>
            </div>
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <p className="font-semibold">{authUser?.fullname}</p>
          <p className="text-xs text-white/60">Online</p>
        </div>
      </div>
      <div className="">
        {isLoggingOut ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <LogOut onClick={logout} className="cursor-pointer size-5" />
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
