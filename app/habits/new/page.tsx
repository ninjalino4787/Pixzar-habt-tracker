"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/register");
    }
  }, [router]);

  // Form states
  const [inputHabit, setInputHabit] = useState("");
  const [inputWhy, setInputWhy] = useState("");
  const [inputTimeCommit, setInputTimeCommit] = useState("");
  const [inputDurationCommit, setinputDurationCommit] = useState("");
  
  // 1. ADDED STATE FOR CHECKBOX
  const [isChecked, setIsChecked] = useState(false);

  async function FormSubmitHandler() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/habits/addhabit`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          habit: inputHabit,
          why: inputWhy,
          repeat: inputDurationCommit,
          repeatInDuration: inputTimeCommit,
        }),
      });

      if (!response.ok) {
        console.log(`Response status ${response.status}`);
        throw new Error(`Response status ${response.status}`);
      }
      const result = await response.json();
      console.log(result);

      // Clear the form data upon success
      setInputHabit("");
      setInputWhy("");
      setInputTimeCommit("");
      setinputDurationCommit("");
      
      // 3. RESET THE CHECKBOX STATE TO FALSE
      setIsChecked(false);
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-br from-cyan-400 via-cyan-600 to-cyan-800 ">
      <div className="border p-6 md:p-10 items-center justify-center bg-gray-600 text-white w-full max-w-lg mx-auto rounded-2xl">
        <div className="text-center p-5">
          <h1 className="text-2xl md:text-4xl font-bold">Welcome to Pixzar!</h1>
          <p className="text-xl">Write and we would track it</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            FormSubmitHandler();
          }}
          className="flex flex-col gap-4"
        >
          {/* Habit input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="habit">Your new Habit</label>
            <input
              type="text"
              name="habit"
              id="habit"
              placeholder="Habit"
              required
              value={inputHabit}
              onChange={(e) => setInputHabit(e.target.value)}
              className="w-full border p-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-cyan-400 focus:outline-cyan-700"
            />
          </div>
          
          {/* Why input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="why">Why are you doing this?</label>
            <input
              type="text"
              id="why"
              name="why"
              placeholder="Your Why?"
              required
              value={inputWhy}
              onChange={(e) => setInputWhy(e.target.value)}
              className="w-full border p-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-cyan-400 focus:outline-cyan-700"
            />
          </div>

          {/* Time commitment select */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="timeCommit">
              How much time would you like to commit to this habit
            </label>
            <select
              name="timeCommit"
              id="timeCommit"
              required
              value={inputTimeCommit}
              onChange={(e) => setInputTimeCommit(e.target.value)}
              className="w-full border p-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-cyan-400 focus:outline-cyan-700"
            >
              <option value="">Select Daily commitment</option>
              <option value="30">30mins</option>
              <option value="60">1hr</option>
              <option value="90">1hr 30mins</option>
              <option value="120">2hrs</option>
              <option value="150">2hrs 30mins</option>
              <option value="180">3hrs</option>
            </select>
          </div>

          {/* Repeat select */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="repeatedly">
              Do you want to repeat this habit?
            </label>
            <select
              name="repeatedly"
              id="repeatedly"
              className="w-full border p-2 bg-gray-700 text-white placeholder-gray-400 rounded-md focus:ring-2 focus:ring-cyan-400 focus:outline-cyan-700"
              required
              value={inputDurationCommit}
              onChange={(e) => setinputDurationCommit(e.target.value)}
            >
              <option value="">Select a duration</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* 2. CONTROLLED CHECKBOX ELEMENT */}
          <div className="items-center flex border gap-1.5 my-4 p-2 bg-gray-700 text-white placeholder-gray-400 rounded-md">
            <input 
              type="checkbox" 
              name="commit" 
              id="commit" 
              required 
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="commit" className="cursor-pointer select-none">
              I commit to building this Habit
            </label>
          </div>

          <button
            type="submit"
            className="border rounded-md py-2 mt-2 hover:bg-gray-500"
          >
            Add Habit
          </button>
        </form>
      </div>
    </div>
  );
}
