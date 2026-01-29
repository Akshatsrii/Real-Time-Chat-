import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-white/80 border-b border-slate-200 fixed w-full top-0 z-40 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all group">
              <div className="size-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Chatty
              </h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-slate-900 transition-all duration-300"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link 
                  to={"/profile"} 
                  className="btn btn-sm gap-2 bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-slate-900 transition-all duration-300"
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button 
                  className="btn btn-sm gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white border-none hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300" 
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;