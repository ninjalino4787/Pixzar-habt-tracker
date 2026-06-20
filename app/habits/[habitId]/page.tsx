"use client";
import HabitBarChart from "@/app/components/HabitBarChart";
import MotivationShufflePage from "@/app/components/MotivationShuffle";
// import { use } from "react";
import { useLocalStorage } from "@/app/customHooks/uselocalstorage/page";
import { use, useEffect, useState } from "react";
// import { useParams } from "next/navigation";

interface Habit {
  id: string;
  name: string;
  isCompleted: boolean; // Add whatever other fields your habits have
  habit: string;
  why: string;
  commitment: string;
  repeat: string;
  commited: string;
  checkIn: boolean;
}

interface CheckIN {
  timeStamps: string;
  habitId: string;
  date: string;
}

export default function HabitDetailpage({
  params,
}: {
  params: Promise<{ habitId: string }>; //was id instead of habitId in this line
}) {
  // unwrap the id from the url
  const resolvedParams = use(params);
  const id = resolvedParams.habitId;

  const [allHabits, setAllHabits] = useLocalStorage<Habit[]>("habit", []);
  //the localstorage checkin part

  const [clicked, setClicked] = useState<boolean>(false);

  const CheckInFunction = (): void => {
    const checkInKey = JSON.parse(localStorage.getItem("checkIn") || "[]");
    checkInKey.push({
      habitId: id,
      date: new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date(),
      ),
    });

    localStorage.setItem("checkIn", JSON.stringify(checkInKey));
    setClicked(true);
    // console.log(Math.round((Math.random()*10)))
  };

  useEffect(() => {
    const today = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(new Date());
    const readCheckIn: CheckIN[] = JSON.parse(
      localStorage.getItem("checkIn") || "[]",
    );
    const alreadyCheckedIn = readCheckIn.some(
      (c) => c.habitId === id && c.date === today,
    );
    alreadyCheckedIn ? setClicked(true) : setClicked(false);
  }, []);

  const foundHabit = allHabits.find((h) => h.id === id);

  {
    if (!foundHabit) return <div className="p-8">Loading habit...</div>;
  }

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-white via-cyan-200 to-blue-100">
      <h1 className="text-2xl md:text-4xl font-bold p-6">
        Habit : {foundHabit.habit.toUpperCase()}
      </h1>
      <div className="mt-10 flex flex-col gap-y-2">
        <p className="text-gray-600  text-xl">Your Why: {foundHabit.why}</p>
        <p className="text-gray-600  text-xl">
          Your Commitment: {foundHabit.commitment}mins {foundHabit.repeat}
        </p>
        <button
          className=" text-lg md:text-2xl border rounded-md mt-2 px-4 py-2 hover:cursor-pointer w-full md:w-fit"
          onClick={CheckInFunction}
        >
          {clicked ? <p>Check In successful ✅</p> : <p>Check In</p>}
        </button>
        <h2>Fun Facts about people with good habits 👇</h2>
        <MotivationShufflePage/>
        <HabitBarChart/>
      </div>
    </div>
  );
}

