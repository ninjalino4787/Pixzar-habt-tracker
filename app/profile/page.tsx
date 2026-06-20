"use client"

import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-200 to-blue-100 flex flex-col items-center justify-center gap-6 px-6">

      {/* Avatar */}
      <div className="w-24 h-24  md:w-32 md:h-32 md:text-5xl rounded-full bg-cyan-400 flex items-center justify-center text-4xl font-bold text-white shadow-md">
        P
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Pixzar User</h1>
        <p className="text-gray-500 mt-1">user@gmail.com</p>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 w-full max-w-sm shadow-sm flex flex-col gap-3">
        <p className="text-gray-700"><strong>Name:</strong> Pixzar User</p>
        <p className="text-gray-700"><strong>Email:</strong> user@gmail.com</p>
        <p className="text-gray-700"><strong>Member since:</strong> June 2026</p>
      </div>

      <Link href="/dashboard" className="text-cyan-600 font-medium hover:underline">
        ← Back to Dashboard
      </Link>

    </div>
  )
}