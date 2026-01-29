import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, CheckCircle } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="mt-2 text-gray-500">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="relative size-32 rounded-full object-cover border-4 border-white shadow-2xl"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600
                  p-2.5 rounded-full cursor-pointer 
                  transition-all duration-200 shadow-lg
                  hover:scale-110 active:scale-95
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              {isUpdatingProfile ? (
                <span className="flex items-center gap-2 text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </span>
              ) : (
                "Click the camera icon to update your photo"
              )}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                Full Name
              </div>
              <p className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 font-medium">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-cyan-600" />
                </div>
                Email Address
              </div>
              <p className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 font-medium">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              Account Information
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-3 border-b border-blue-100">
                <span className="text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Member Since
                </span>
                <span className="font-semibold text-gray-800">
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Account Status
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 font-semibold rounded-full text-xs">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;