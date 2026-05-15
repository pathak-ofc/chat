import React, { useEffect } from "react";
import { chatStore } from "../store/message.Store.js";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton.jsx";
import NoChatsFound from "./NoChatsFound.jsx";
import { authStore } from "../store/auth.Store.js";

const ContactContainer = () => {
  const { contacts, getContacts, isUserLoading, setSelectedUser } = chatStore();
  const { onlineUsers } = authStore();

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  if (isUserLoading) return <UsersLoadingSkeleton />;

  return (
    <div className="space-y-2">
      {contacts?.map((c) => (
        <div
          key={c._id}
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10"
          onClick={() => setSelectedUser(c)}
        >
          <div className={`avatar ${onlineUsers.includes(c._id) ? "online" : "offline"}`}>
            <div className="rounded-full size-12">
              <img src={c.profilePic || "/avatar.png"} alt={c.fullname} />
            </div>
          </div>
          <h4 className="font-medium truncate text-slate-200">{c.fullname}</h4>
        </div>
      ))}
    </div>
  );
};

export default ContactContainer;
