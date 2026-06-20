"use client";

import React, { useEffect, useState } from "react";
import AddHabit from "../components/AddHabit";
import Link from "next/link";
import { useLocalStorage } from "../customHooks/uselocalstorage/page";

interface Habit {
  id: string;
  habit: string;
  why: string;
  commitment: string;
  repeat: string;
  commited: string;
  checkIn: boolean;
}

export default function DashboardPage() {
  // my newly coded custom hook
  const [parsed, setParsed] = useLocalStorage<Habit[]>("habit", []);
  // the new delete below
  const deleteHabit = (e: React.MouseEvent, idToDelete: string): void => {
    e.preventDefault();
    const updatedHabits = parsed.filter((habit)=>habit.id!==idToDelete)
    setParsed(updatedHabits)
  };
  // no longer in use
  // const [parsed, setParsed] = useState<Habit[]>([]);
  // // const [del, setDel] = useState(null);

  // useEffect(() => {
  //   const habitData = localStorage.getItem("habit");
  //   const parsedData = JSON.parse(habitData || "[]");
  //   setParsed(parsedData);
  // }, []);

  // const deleteHabit = (index: number): void =>{
  //   const data = JSON.parse(localStorage.getItem("habit") || "[]");
  //   // localStorage.clear()
  //   data.splice(index,1);
  //   setParsed(data)
  //   localStorage.setItem("habit",JSON.stringify(data));
  //   // i forgot why i commented this out
  //   // const updatedHabits = [...parsed];
  //   // updatedHabits.splice(index,1)
  //   // setParsed(updatedHabits)
  //   // localStorage.clear()
  //   // localStorage.setItem("habits", JSON.stringify(updatedHabits))
  // }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-white via-cyan-200 to-blue-100 pt-12 pb-16">
      <div className="sticky top-0 z-4 w-full text-center bg-gradient-to-br from-white/80 via-cyan-200/80 to-blue-100/80 backdrop-blur-sm py-4 px-6">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold"> Pixar&apos;s habit Dashboard</h1>
        {parsed.length === 0 ? (
          <div className="flex flex-col mt-4 gap-4 items-center justify-center">
            <p className="text-xl md:text-3xl font-semibold">You have no habits yet</p>{" "}
            <AddHabit label="Add Habit" />
          </div>
        ) : parsed.length === 1 ? (
          <p className="mt-8 font-semibold text-xl md:text-3xl">
            You have {parsed.length} habit{" "}
          </p>
        ) : (
          <p className="mt-8 font-semibold text-3xl">
            You have {parsed.length} habits{" "}
          </p>
        )}
      </div>
      {/* map method */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-4 md:px-8">
        {parsed.map((item, index) => (
          <Link href={`/habits/${item.id}`} key={item.id || index}>
            <div
              className="relative bg-gray-600/40 backdrop-blur-lg p-4 md:p-10 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out text-black"
              key={index}
            >
              <button
                className="absolute top-0 right-0 border-black-2 bg-black text-white hover:text-red-700 rounded-tr-md cursor-pointer"
                onClick={(e) => deleteHabit(e,item.id)}
              >
                Delete
              </button>
              <p className="font-bold text-xl mb-2">Habit: {item.habit}</p>
              <p className=" mb-2">
                <strong>Why:</strong> {item.why}
              </p>
              <p className=" mb-2">
                <strong>Commitment:</strong> {item.commitment}mins
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
