import React from 'react'

const ProfileHeader = () => {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="w-10 h-10 rounded-full bg-cyan-500" />
      <div>
        <p className="font-semibold">Your Name</p>
        <p className="text-xs text-white/60">Online</p>
      </div>
    </div>
  );
};

export default ProfileHeader