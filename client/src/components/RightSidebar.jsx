"use client"

import { useState } from "react"
import assets, { imagesDummyData } from "../assets/assets"

const RightSidebar = ({ selectedUser, messages = [] }) => {
  const [activeView, setActiveView] = useState("profile")

  // Filter messages to get only media messages
  const mediaMessages = imagesDummyData

  // Get media count
  const mediaCount = mediaMessages.length

  const MediaGallery = () => (
    <div className="h-full flex flex-col">
      {/* Media Header */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <button
          onClick={() => setActiveView("profile")}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h2 className="text-lg font-semibold text-white">Shared Media</h2>
          <p className="text-sm text-gray-400">{mediaCount} files</p>
        </div>
      </div>

      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {mediaMessages.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {mediaMessages.map((url, index) => (
              <div
                key={index}
                className="relative group cursor-pointer rounded-lg overflow-hidden bg-white/5 border border-white/10"
              >
                <img
                  src={url || "/placeholder.svg"}
                  alt=""
                  className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  {/* <p className="text-xs text-white font-medium">{new Date().toLocaleDateString()}</p> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">No media shared yet</p>
            <p className="text-gray-500 text-xs mt-1">Photos and files will appear here</p>
          </div>
        )}
      </div>

      {/* Media Actions */}
      <div className="p-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/15 rounded-lg transition-colors">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-white text-sm">Save All</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/15 rounded-lg transition-colors">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            <span className="text-white text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  )

  const ProfileView = () => (
    <div className="h-full flex flex-col">
      {/* Profile Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col items-center text-center">
          {/* Profile Picture */}
          <div className="relative mb-4">
            <img
              src={selectedUser?.profilePic || assets.avatar_icon || "/placeholder.svg"}
              alt={selectedUser?.fullName || "User"}
              className="w-24 h-24 rounded-full border-4 border-white/30 shadow-2xl object-cover"
            />
            <span className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 border-3 border-slate-900 shadow-lg"></span>
          </div>

          {/* User Info */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">{selectedUser.fullName}</h1>
            <p className="text-sm text-green-400 font-medium">Online</p>
            {selectedUser.bio && (
              <p className="text-sm text-gray-300 leading-relaxed max-w-xs mx-auto mt-3 px-2">{selectedUser.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-3">
        <button className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 rounded-xl transition-colors duration-200 border border-white/10">
          <div className="w-10 h-10 bg-violet-600/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <span className="text-white font-medium">Voice Call</span>
        </button>

        <button className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 rounded-xl transition-colors duration-200 border border-white/10">
          <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-white font-medium">Video Call</span>
        </button>

        <button
          onClick={() => setActiveView("media")}
          className="w-full flex items-center gap-3 p-3 bg-white/10 hover:bg-white/15 rounded-xl transition-colors duration-200 border border-white/10"
        >
          <div className="w-10 h-10 bg-emerald-600/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="flex-1 text-left">
            <span className="text-white font-medium">View Media</span>
            <p className="text-xs text-gray-400">{mediaCount} files</p>
          </div>
        </button>
      </div>

      {/* User Details */}
      <div className="p-4 space-y-4 flex-1">
        <h3 className="text-lg font-semibold text-white mb-3">Details</h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="w-8 h-8 bg-gray-600/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400">Username</p>
              <p className="text-sm text-white font-medium">@{selectedUser.fullName?.toLowerCase().replace(" ", "")}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="w-8 h-8 bg-gray-600/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400">Last seen</p>
              <p className="text-sm text-white font-medium">Just now</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="w-8 h-8 bg-gray-600/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400">Media shared</p>
              <p className="text-sm text-white font-medium">{mediaCount} files</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-white/10">
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg transition-colors duration-200 text-left">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-gray-300 text-sm">View Profile</span>
          </button>

          <button className="w-full flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg transition-colors duration-200 text-left">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="text-gray-300 text-sm">Block User</span>
          </button>

          <button className="w-full flex items-center gap-3 p-3 hover:bg-red-500/10 rounded-lg transition-colors duration-200 text-left">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span className="text-red-400 text-sm">Delete Chat</span>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    selectedUser && (
      <div className="h-full w-80 bg-gradient-to-b from-slate-900/40 to-slate-800/60 backdrop-blur-xl border-l border-white/20 overflow-auto">
        {activeView === "profile" ? <ProfileView /> : <MediaGallery />}
      </div>
    )
  )
}

export default RightSidebar
