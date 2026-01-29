import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <img 
              src={selectedUser.profilePic || "/avatar.png"} 
              alt={selectedUser.fullName}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-200"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-white shadow-lg"></span>
            )}
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-gray-800">{selectedUser.fullName}</h3>
            <p className="text-sm flex items-center gap-1.5">
              {onlineUsers.includes(selectedUser._id) ? (
                <>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-green-600 font-medium">Online</span>
                </>
              ) : (
                <span className="text-gray-400">Offline</span>
              )}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;