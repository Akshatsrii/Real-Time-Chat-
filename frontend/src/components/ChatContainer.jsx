import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-white">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-50 to-white">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
            ref={messageEndRef}
          >
            <div className={`flex gap-3 max-w-[70%] ${message.senderId === authUser._id ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200"
                />
              </div>

              {/* Message Content */}
              <div className="flex flex-col">
                <div className={`flex items-center gap-2 mb-1 ${message.senderId === authUser._id ? "flex-row-reverse" : "flex-row"}`}>
                  <time className="text-xs text-gray-400 font-medium">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                
                <div
                  className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                    message.senderId === authUser._id
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[200px] rounded-lg mb-2 shadow-md"
                    />
                  )}
                  {message.text && <p className="text-sm leading-relaxed">{message.text}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;