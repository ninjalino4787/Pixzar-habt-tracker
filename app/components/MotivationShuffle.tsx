import { useState, useEffect } from "react";

const motivationCycle = [
  "Small habits, massive results.", //0
  "Miss once, never twice.",//1
  "Your environment shapes your habits.", //2...
  "Identity first, results follow.",
  "1% better every day = 37x better in a year.",
  "Anchor new habits to existing ones.",
  "Automate decisions, conserve willpower.",
  "Tiny actions beat big intentions.",
  "Consistency beats intensity every time.",//9
]

// console.log(Math.round(Math.random() * 10));
//   const motivationIndex: number = (Math.round(Math.random() * 10))

export default function MotivationShufflePage() {
  const [motivation, setMotivation] = useState<string>("");
  useEffect(() => {
    setMotivation(motivationCycle[0])

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationCycle.length);
      setMotivation(motivationCycle[randomIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return <div  className="flex text-2xl  border-white bg-white/60 backdrop-blur-2xl hover:scale-105 transition-all duration-300 justify-center hover:shadow-2xl rounded-xl p-4">{motivation}</div>;
}
