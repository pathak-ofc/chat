import React, { useEffect } from "react";
import { chatStore } from "../store/message.Store.js";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton.jsx";
import NoChatsFound from "./NoChatsFound.jsx";

const ChatList = () => {
  const { chats, getChats, isUserLoading, setSelectedUser } = chatStore();

  useEffect(() => {
    getChats;
  }, [getChats]);

  if (isUserLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-2">
      {contacts.map((c) => (
        <div
          key={c._id}
          className="flex items-center gap-3 p-3 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10"
          onClick={() => setSelectedUser(c)}
        >
          <div className="avatar online">
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

export default ChatList;
