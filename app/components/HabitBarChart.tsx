"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartDataTranslator } from "./BarDataFunction"

interface CheckInType {
  habitId: string;
  createdAt: string;
}

export default function HabitBarChart({ habitId }: { habitId: string }) {
  const [checkIns, setCheckIns] = useState<CheckInType[]>([])

  useEffect(() => {
    async function fetchCheckIns() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkIn/${habitId}/getCheckIns`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        const result = await response.json()
        if (!response.ok) throw new Error(`Error ${response.status}`)
        setCheckIns(result)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCheckIns()
  }, [habitId])

  const chartData = ChartDataTranslator(checkIns)

  return (
    <div className="w-full mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Check-ins this week</h2>
      <h2 className="text-xl font-semibold mb-4">You've done amazing, still you can do better 😁</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#22d3ee" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}