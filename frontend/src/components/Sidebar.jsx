import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-200 bg-white flex flex-col transition-all duration-200">
      <div className="border-b border-gray-200 w-full p-5 bg-gradient-to-br from-gray-50 to-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-800 hidden lg:block">Contacts</span>
        </div>
        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span className="text-sm text-gray-600 font-medium">Show online only</span>
          </label>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50
              transition-all duration-200
              ${
                selectedUser?._id === user._id
                  ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-600"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full ring-2 ring-gray-200"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full ring-2 ring-white shadow-lg animate-pulse" />
                )}
              </div>
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-semibold truncate text-gray-800">{user.fullName}</div>
              <div className="text-sm flex items-center gap-1.5">
                {onlineUsers.includes(user._id) ? (
                  <>
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-green-600 font-medium">Online</span>
                  </>
                ) : (
                  <span className="text-gray-400">Offline</span>
                )}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <p className="font-medium">No online users</p>
            <p className="text-sm text-gray-400 mt-1">Check back later</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;