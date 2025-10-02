import React, { useState } from 'react'
import { setLocalStorage } from '../../utils/localStorage'
import { LogOut } from 'lucide-react';

const Header = (props) => {
  const logOutUser = ()=>{
    localStorage.setItem('loggedInUser','')
    props.changeUser('')
  }

const username = props.data?.firstName || props.data?.name || 'User';
  
  return (
    <div className="flex m-6 h-32  justify-between items-center bg-white/10 border-2 border-cyan-400/40 rounded-xl p-8 sm:flex-row sm:gap-0 sm:w-auto">
  <h1 className="text-white text-2xl sm:text-2xl">
    Welcome Back <br />
    <span className="text-4xl font-semibold !text-yellow-500">{username} 👋</span>
  </h1>
  <button
  onClick={logOutUser}
  className="bg-red-600 hover:bg-red-500 hover:scale-105 text-md font-medium text-white px-5 py-3 rounded-sm flex items-center gap-2 transition-all duration-300 cursor-pointer"
>
  <LogOut size={20} className="text-white" />
  Log Out
</button>

</div>

  )
}

export default Header