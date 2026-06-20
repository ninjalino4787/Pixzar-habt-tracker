"use client"
import Link from 'next/link'
import React from 'react'
import AddHabit from './components/AddHabit'
import MotivationShufflePage from './components/MotivationShuffle'

export default function page() {
  return (
    
      <div className="flex-1 flex flex-col gap-10 justify-center items-center min-h-screen bg-gradient-to-br from-white via-cyan-200 to-blue-100 px-4 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold">PIXZAR</h1>
        <h1 className="text-center text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800">Your very own habit tracker</h1>
        <div className="flex flex-col md:flex gap-4 lg:flex lg:gap-12 pointer-events-auto">
          <Link href="/profile" className="bg-gradient-to-r from-cyan-400 via-cyan-400 to-cyan-600 text-black rounded-full px-6 py-4">Profile</Link>
          <AddHabit/>
          <Link href="/dashboard" className="bg-gradient-to-r from-cyan-400 via-cyan-400 to-cyan-600 text-black rounded-full px-6 py-4">Check In</Link>
        </div>
          <MotivationShufflePage/>
      </div>
  )
}
