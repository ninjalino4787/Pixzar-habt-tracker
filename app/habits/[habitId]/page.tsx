"use client";
import HabitBarChart from "@/app/components/HabitBarChart";
import MotivationShufflePage from "@/app/components/MotivationShuffle";
import React, { use, useEffect, useState } from "react";

interface Habit {
  _id: string;
  habit: string;
  why: string;
  commitment: string;
  repeat: string;
}

interface CheckIn {
  _id: string;
  habitId: string;
  userId: string;
  createdAt: string;
}

export default function HabitDetailpage({
  params,
}: {
  params: Promise<{ habitId: string }>;
}) {
  const resolvedParams = use(params);
  const id = resolvedParams.habitId;

  const [habitDisplay, setHabitDisplay] = useState<Habit | null>(null);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    async function HabitDetailDisplay() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/habits/getHabits`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(`Response Error ${response.status}`);
        }

        const foundHabit = result.find((h: Habit) => h._id === id);
        setHabitDisplay(foundHabit);
      } catch (error) {
        console.error(error);
      }
    }

    async function checkTodayCheckIn() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/checkIn/${id}/getCheckIns`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const result: CheckIn[] = await response.json();

        if (!response.ok) {
          throw new Error(`Response Error ${response.status}`);
        }

        const today = new Date().toDateString();
        const alreadyCheckedIn = result.some(
          (c) => new Date(c.createdAt).toDateString() === today,
        );

        if (alreadyCheckedIn) setChecked(true);
      } catch (error) {
        console.error(error);
      }
    }

    HabitDetailDisplay();
    checkTodayCheckIn();
  }, [id]);

  async function checkInFunction() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/checkIn/${id}/checkInHabit`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          checker: true,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`Response Error ${response.status}`);
      }

      setChecked(true);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  if (!habitDisplay) return (
     <div className="bg-gradient-to-br from-white via-cyan-200 to-blue-100 h-screen w-screen flex justify-center items-center ">
          <div className="border-2 p-4 md:p-6 rounded-xl bg-gray-700 text-cyan-400 border-gray-400">
            <p>Getting User&apos;s Habit...</p>
          </div>
        </div>
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-white via-cyan-200 to-blue-100">
      <h1 className="text-2xl md:text-4xl font-bold p-6">
        Habit: {habitDisplay.habit.toUpperCase()}
      </h1>
      <div className="mt-10 flex flex-col gap-y-2">
        <p className="text-gray-600 text-xl">Your Why: {habitDisplay.why}</p>
        <p className="text-gray-600 text-xl">
          Your Commitment: {habitDisplay.commitment}mins {habitDisplay.repeat}
        </p>
        <button
          className="text-lg md:text-2xl border rounded-md mt-2 px-4 py-2 hover:cursor-pointer w-full md:w-fit"
          onClick={checkInFunction}
          disabled={checked}
        >
          {checked ? <p>Check In successful ✅</p> : <p>Check In</p>}
        </button>
        <h2>Fun Facts about people with good habits 👇</h2>
        <MotivationShufflePage />
        <HabitBarChart habitId={id}/>
      </div>
    </div>
  );
}