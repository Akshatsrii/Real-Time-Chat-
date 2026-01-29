import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl blur-2xl opacity-40 animate-pulse"></div>
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-bounce">
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          Welcome to Chatty!
        </h2>
        <p className="text-gray-500 text-lg">
          Select a conversation from the sidebar to start chatting
        </p>
        
        {/* Decorative elements */}
        <div className="flex justify-center gap-2 pt-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;