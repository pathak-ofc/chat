import React, { useMemo,useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import {authStore} from './store/auth.Store.js'
import PageLoader from './components/PageLoader.jsx' 
import {Toaster} from 'react-hot-toast'

const App = () => {

  const {checkAuth, isCheckingAuth, authUser} = authStore();

  useEffect( () => {
    checkAuth();
  },[checkAuth])

  console.log({authUser})




  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        size: 1 + (i % 3),
        left: (i * 13) % 100,
        top: (i * 17) % 100,
        delay: (i % 7) * 0.6,
        duration: 8 + (i % 5),
      })),
    []
  )

  const lines = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        top: 8 + i * 11,
        width: 22 + (i % 3) * 12,
        delay: i * 1.4,
        duration: 10 + (i % 3) * 2,
      })),
    []
  )

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02030a] text-white">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,30,60,0.35),transparent_35%),linear-gradient(to_bottom_right,#02030a,#040816,#02030a)]" />

      {/* Ambient color wash */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(139,92,246,0.10),transparent_24%),radial-gradient(circle_at_85%_75%,rgba(34,211,238,0.10),transparent_24%),radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_40%)]" />

      {/* Soft big blobs */}
      <div className="absolute -left-40 top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-violet-600/10 blur-[140px]" />
      <div className="absolute right-[-8rem] top-[25%] h-[24rem] w-[24rem] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute bottom-[-10rem] left-[30%] h-[20rem] w-[20rem] rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Moving lines */}
      <div className="absolute inset-0 overflow-hidden opacity-35">
        {lines.map((line) => (
          <span
            key={line.id}
            className="absolute block h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent animate-[floatLine_linear_infinite]"
            style={{
              top: `${line.top}%`,
              left: '-30%',
              width: `${line.width}%`,
              animationDelay: `${line.delay}s`,
              animationDuration: `${line.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white/70 animate-[twinkle_ease-in-out_infinite]"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              boxShadow:
                p.id % 4 === 0
                  ? '0 0 10px rgba(255,255,255,0.45), 0 0 18px rgba(34,211,238,0.18)'
                  : '0 0 6px rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>

      {/* Mesh grid */}
      <div className="absolute inset-0 opacity-[0.14] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

      {/* Dark vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,0.72)_100%)]" />

      {/* Page content centered */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <Routes>
          <Route path="/" element={authUser? <ChatPage /> : <Navigate to={"/login"}/>} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"}/>} />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/"}/>} />
        </Routes>
        <Toaster/>
      </div>

    </div>
  )
}

export default App