import Link from 'next/link'
import React from 'react'

interface AddHabitProps{
    label?: string
}

export default function AddHabit({label="Add new habit"}:AddHabitProps) {
  return (
    <div>
        <Link href="/habits/new"><button className="bg-linear-to-r from-cyan-400 via-cyan-400 to-cyan-600 text-black rounded-full px-6 py-4">{label}</button></Link>
    </div>
  )
}
