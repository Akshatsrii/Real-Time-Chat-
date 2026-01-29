import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-4 w-full border-t border-gray-200 bg-white">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200 shadow-md"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex items-center justify-center shadow-lg transition-all hover:scale-110"
              type="button"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-gray-700 placeholder:text-gray-400"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex w-11 h-11 rounded-xl items-center justify-center transition-all duration-200 ${
              imagePreview
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50 hover:shadow-xl hover:scale-105"
                : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
            (text.trim() || imagePreview)
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:scale-105 hover:from-blue-700 hover:to-cyan-600"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;