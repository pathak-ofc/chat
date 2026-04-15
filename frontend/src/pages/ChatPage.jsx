import React from 'react'
import {chatStore} from '../store/message.Store.js'

import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ChatList from "../components/ChatList.jsx";
import ContactList from "../components/ContactList.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder.jsx";

const ChatPage = () => {
  const { selectedUser, activeTab } = chatStore();

  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto flex h-[800px] w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        
        {/* LEFT SIDEBAR */}
        <aside className="flex w-[320px] flex-col border-r border-white/10 bg-white/[0.03]">
          <div className="border-b shrink-0 border-white/10">
            <ProfileHeader />
          </div>

          <div className="px-3 py-3 border-b shrink-0 border-white/10">
            <ActiveTabSwitch />
          </div>

          <div className="flex-1 px-3 py-3 space-y-2 overflow-y-auto">
            {activeTab === "chat" ? <ChatList /> : <ContactList />}
          </div>
        </aside>

        {/* RIGHT PANEL */}
        <main className="flex flex-col flex-1 min-w-0 bg-black/10">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </main>
      </div>
    </div>
  );
};


export default ChatPage