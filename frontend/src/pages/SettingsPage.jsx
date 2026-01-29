import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Palette, Eye } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-20 max-w-5xl pb-10">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Theme Settings
            </h2>
          </div>
          <p className="text-gray-500 ml-13">Choose a theme for your chat interface</p>
        </div>

        {/* Theme Grid */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-600" />
            Available Themes
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`
                  group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200
                  ${
                    theme === t
                      ? "bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-500 shadow-md"
                      : "bg-gray-50 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }
                `}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-10 w-full rounded-lg overflow-hidden shadow-sm" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold truncate w-full text-center ${
                    theme === t ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
                {theme === t && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-cyan-600" />
            Live Preview
          </h3>
          <div className="rounded-xl border-2 border-gray-200 overflow-hidden bg-base-100 shadow-lg">
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="max-w-lg mx-auto">
                {/* Mock Chat UI */}
                <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-300">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
                        J
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">John Doe</h3>
                        <p className="text-xs text-base-content/70 flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Online
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`
                            max-w-[80%] rounded-2xl p-3 shadow-md
                            ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                          `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`
                              text-[10px] mt-1.5
                              ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                            `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10 rounded-xl"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-10 min-h-0 px-4 rounded-xl shadow-md hover:shadow-lg transition-all">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;