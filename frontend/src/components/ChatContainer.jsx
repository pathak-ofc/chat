import React, { useEffect, useRef } from "react";
import { chatStore } from "../store/message.Store";
import { authStore } from "../store/auth.Store";
import ChatHeader from "./ChatHeader.jsx";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder.jsx";
import MessageInput from "./MessageInput.jsx";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton.jsx";

const ChatContainer = () => {
  const { getMessages, selectedUser, messages, isMessageLoading, subscribeToMessages, unsubscribeFromMessages } =
    chatStore();
  const { authUser } = authStore();

  // ✅ scroll container ref
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();

    // ✅ cleanup function to unsubscribe from messages when component unmounts or selectedUser changes
    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // ✅ auto scroll to bottom whenever messages change
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />

      {/* ✅ IMPORTANT: attach ref here */}
      <div
        ref={containerRef}
        className="flex-1 px-6 py-8 overflow-y-auto"
      >
        {isMessageLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((m) => (
              <div
                key={m._id}
                className={`chat ${
                  m?.senderId === authUser?.user?._id
                    ? "chat-end"
                    : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    m?.senderId === authUser?.user?._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {m.image && (
                    <img
                      src={m.image}
                      alt="Sent image"
                      className="object-cover h-48 rounded-lg"
                    />
                  )}

                  {m.text && <p className="mt-2">{m.text}</p>}

                  <p className="flex items-center gap-1 mt-1 text-xs opacity-75">
                    {new Date(m.createdAt).toISOString().slice(11, 16)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser?.fullname} />
        )}
      </div>

      <MessageInput />
    </>
  );
};

export default ChatContainer;