import React from 'react'
import { chatStore } from '../store/message.Store.js';

const ActiveTabSwitch = () => {

  const {activeTab, setActivetab} = chatStore();


  return (
    <div className="flex gap-2">
      <button onClick={() => {setActivetab('chats')}} className={`flex-1 py-2 text-sm rounded-lg ${activeTab === 'chats' ? 'bg-white/20' : 'bg-white/5'}`}>
        Chats
      </button>
      <button onClick={() => {setActivetab('contacts')}} className={`flex-1 py-2 text-sm rounded-lg ${activeTab === 'contacts' ? 'bg-white/20' : 'bg-white/5'}`}>
        Contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch
