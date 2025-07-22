"use client"

import { useEffect, useRef } from "react"
import assets, { messagesDummyData } from "../assets/assets"
import { formatMessageTime } from "../lib/utils"

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef()

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollEnd.current?.scrollIntoView({ behavior: "smooth" })
    }, 100) 
    return () => clearTimeout(timeout)
  }, [selectedUser, messagesDummyData.length])

  return selectedUser ? (
    <div className="h-full pt-4 overflow-hidden relative backdrop-blur-xl bg-gradient-to-b from-slate-900/40 to-slate-800/60">
      {/* Header */}
      <div className="flex items-center gap-4 py-4 px-6 border-b border-white/20 bg-black/30 backdrop-blur-sm">
        <div className="relative">
          <img
            src={assets.profile_martin || "/placeholder.svg"}
            alt=""
            className="w-10 h-10 rounded-full border-2 border-white/30 shadow-lg"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-slate-900"></span>
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-white">Martin Johnson</p>
          <p className="text-xs text-green-400 font-medium">Online</p>
        </div>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon || "/placeholder.svg"}
          alt=""
          className="md:hidden w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity"
        />
        <img
          src={assets.help_icon || "/placeholder.svg"}
          alt="help"
          className="max-md:hidden w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity"
        />
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col h-[calc(100%_-_120px)] overflow-y-scroll p-4 pb-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-3 mb-6 ${msg.senderId !== "680f50e4f10f3cd28382ecf9" && "flex-row-reverse"}`}
          >
            {msg.image ? (
              <div className="relative group">
                <img
                  src={msg.image || "/placeholder.svg"}
                  alt=""
                  className="max-w-[280px] border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-colors duration-300"></div>
              </div>
            ) : (
              <div
                className={`px-4 py-3 max-w-[280px] text-sm font-medium break-words text-white rounded-2xl shadow-lg backdrop-blur-sm border border-white/10 ${
                  msg.senderId === "680f50e4f10f3cd28382ecf9"
                    ? "bg-white/15 rounded-bl-md"
                    : "bg-violet-600/90 rounded-br-sm shadow-violet-500/20"
                }`}
              >
                {msg.text}
              </div>
            )}
            <div className="text-center flex flex-col items-center gap-1">
              <img
                src={msg.senderId === "680f50e4f10f3cd28382ecf9" ? assets.avatar_icon : assets.profile_martin}
                alt=""
                className="w-8 h-8 rounded-full border border-white/30 shadow-md"
              />
              <p className="text-xs text-gray-400 font-medium">{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* Bottom Input Area */}
      <div className="p-2 border-t border-white/20 bg-black/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 p-2 rounded-full shadow-lg">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 text-sm px-2 py-1 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent"
            />
            <input type="file" id="image" accept="image/png, image/jpeg" hidden />
            <label
              htmlFor="image"
              className="cursor-pointer p-1.5 hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <img
                src={assets.gallery_icon || "/placeholder.svg"}
                className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity"
                alt="Attach"
              />
            </label>
          </div>
          <button className="p-3 bg-violet-600 hover:bg-violet-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <img src={assets.send_button || "/placeholder.svg"} alt="Send" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-6 text-gray-400 bg-gradient-to-b from-slate-900/30 to-slate-800/50 backdrop-blur-xl max-md:hidden h-full">
      <div className="p-8 bg-white/5 rounded-full border border-white/10 shadow-2xl">
        <img src={assets.logo_icon || "/placeholder.svg"} alt="" className="w-16 h-16 opacity-60" />
      </div>
      <div className="text-center">
        <p className="text-xl font-semibold text-white mb-2">Chat anytime, anywhere</p>
        <p className="text-sm text-gray-400">Select a conversation to start messaging</p>
      </div>
    </div>
  )
}

export default ChatContainer
