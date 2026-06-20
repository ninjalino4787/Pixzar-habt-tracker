"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useLocalStorage } from "../customHooks/uselocalstorage/page"
import { ChartDataTranslator } from "./BarDataFunction"

interface CheckInType {
  date: string;
  habitId: string;
}

export default function HabitBarChart() {
  const [checkIns] = useLocalStorage<CheckInType[]>("checkIn", [])
  const chartData = ChartDataTranslator(checkIns)

  return (
    <div className="w-full mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Check-ins this week</h2>
      <h2 className="text-xl font-semibold mb-4">You've done amazing, Still you can do better😁</h2>
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