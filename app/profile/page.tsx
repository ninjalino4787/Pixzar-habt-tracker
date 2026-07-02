"use client";

import Link from "next/link";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface userInterface {
  username: string;
  email: string;
}
export default function ProfilePage() {
    const router = useRouter()

  // result catch state
  const [details, setDetails] = useState<userInterface>();

  useEffect(() => {
    // backend function
    async function profileExtract() {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/profile/getProfile`;
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
          throw new Error(`response error ${response.status}`);
        }

        setDetails(result);
      } catch (error) {
        console.error(error);
      }
    }

    profileExtract();
  },[]);

  // log out function
  function logoutFunction() {
    localStorage.removeItem("token");
    router.push("/register")
  }
  {
    if (!details) {
      return (
        <div className="bg-gradient-to-br from-white via-cyan-200 to-blue-100 h-screen w-screen flex justify-center items-center ">
          <div className="border-2 p-4 md:p-6 rounded-xl bg-gray-700 text-cyan-400 border-gray-400">
            <p>Getting User&apos;s Profile...</p>
          </div>
        </div>
      );
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-200 to-blue-100 flex flex-col items-center justify-center gap-6 px-6">
      {/* Avatar */}
      <div className="w-24 h-24  md:w-32 md:h-32 md:text-5xl rounded-full bg-cyan-400 flex items-center justify-center text-4xl font-bold text-white shadow-md">
        {details.email.charAt(0)}
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">{details.username}</h1>
        <p className="text-gray-500 mt-1">{details.email}</p>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 w-full max-w-sm shadow-sm flex flex-col gap-3">
        <p className="text-gray-700">
          <strong>User Name:</strong> {details.username}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong>
          {details.email}
        </p>
        <p className="text-gray-700">
          <strong>Member since:</strong> June 2026
        </p>
      </div>

      <Link href="/" className="text-cyan-600 font-medium hover:underline">
        ← Back to Home
      </Link>

      <button
        className="text-cyan-600 mt-2 font-medium hover:underline"
        onClick={()=>logoutFunction()}
      >
        Logout
      </button>
    </div>
  );
}
