import React from 'react'

const ActiveTabSwitch = () => {
  return (
    <div className="flex gap-2">
      <button className="flex-1 py-2 text-sm rounded-lg bg-white/10">
        Chats
      </button>
      <button className="flex-1 py-2 text-sm rounded-lg bg-white/5">
        Contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch