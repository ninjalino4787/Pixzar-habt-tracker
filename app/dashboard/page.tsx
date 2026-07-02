"use client";

import React, { useEffect, useState } from "react";
import AddHabit from "../components/AddHabit";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useLocalStorage } from "../customHooks/uselocalstorage/page";

interface Habit {
  _id: string;
  habit: string;
  why: string;
  repeatInDuration: string;
  repeat: string;
  commited: string;
  checkIn: boolean;
}

export default function DashboardPage() {

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/register")
    }
  }, [])
  const [showHabits, setShowHabits] = useState<Habit[]>([]);

  // new function for backend displaying data
  useEffect(() => {
    async function showHabitData() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/habits/getHabits`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          console.error(`Response Error ${response.status}`);

          throw new Error(`Response Error ${response.status}`);
        }
        setShowHabits(result);
      } catch (error) {
        console.error(error);
      }
    }
    showHabitData();
  }, []);

  //  function to delete from the backend
  async function deleteHabit(e: React.MouseEvent, habitId: string) {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/habits/${habitId}/deleteHabit`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(`Response Error ${response.status}`);

        throw new Error(`Response Error ${response.status}`);
      }

      setShowHabits((prev) => prev.filter((h) => h._id !== habitId));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-white via-cyan-200 to-blue-100 pt-12 pb-16">
      <div className="sticky top-0 z-4 w-full text-center bg-gradient-to-br from-white/80 via-cyan-200/80 to-blue-100/80 backdrop-blur-sm py-4 px-6">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold">
          {" "}
          Pixar&apos;s habit Dashboard
        </h1>
        {showHabits.length === 0 ? (
          <div className="flex flex-col mt-4 gap-4 items-center justify-center">
            <p className="text-xl md:text-3xl font-semibold">
              You have no habits yet
            </p>{" "}
            <AddHabit label="Add Habit" />
          </div>
        ) : showHabits.length === 1 ? (
          <p className="mt-8 font-semibold text-xl md:text-3xl">
            You have {showHabits.length} habit{" "}
          </p>
        ) : (
          <p className="mt-8 font-semibold text-3xl">
            You have {showHabits.length} habits{" "}
          </p>
        )}
      </div>
      {/* map method */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-4 md:px-8">
        {showHabits.map((item, index) => (
          <Link href={`/habits/${item._id}`} key={item._id || index}>
            <div
              className="relative bg-gray-600/40 backdrop-blur-lg p-4 md:p-10 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out text-black"
              key={index}
            >
              <button
                className="absolute top-0 right-0 border-black-2 bg-black text-white hover:text-red-700 rounded-tr-md cursor-pointer"
                onClick={(e) => deleteHabit(e, item._id)}
              >
                Delete
              </button>
              <p className="font-bold text-xl mb-2">Habit: {item.habit}</p>
              <p className=" mb-2">
                <strong>Why:</strong> {item.why}
              </p>
              <p className=" mb-2">
                <strong>Commitment:</strong> {item.repeatInDuration}mins
              </p>
              <p className="">
                <strong>Repeat:</strong> {item.repeat}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
