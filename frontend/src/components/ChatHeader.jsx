import React from "react";
import { chatStore } from "../store/message.Store";
import { XIcon } from "lucide-react";

function ChatHeader() {
  const { getMessages, selectedUser, setSelectedUser } = chatStore();
  return (
      <div className="flex items-center justify-between bg-white/[0.03] border border-white/5 flex-1 shrink-0 max-h-[89px] px-6">
        <div className="flex items-center gap-3.5">
          <div className="avatar online">
            <div className="flex rounded-full size-12">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullname}
              />
            </div>
          </div>
          <div>
            <p className="font-semibold">{selectedUser?.fullname}</p>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
        <XIcon className="w-5 h-5 transition-colors cursor-pointer text-slate-400 hover:text-slate-200" onClick={() => setSelectedUser(null)}/>
      </div>
  );
}

export default ChatHeader;
