"use client";

import Link from "next/link";
import React, { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

// 1. Moved static data OUTSIDE the component
const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  // { label: "Settings", href: "/settings" },
  { label: "Profile", href: "/profile" },
  // { label: "Scoreboard", href: "/scoreboard" },
];

export default function Sidebar() {
  // 2. Let TypeScript infer the boolean type
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    // 3. Use functional state update for safety
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Sidebar panel */}
      <aside
        className={`bg-gray-600 text-white transition-all duration-300 overflow-hidden flex flex-col h-screen fixed md:sticky top-0 left-0 inset-y-0 z-10 ${
          isOpen ? "w-64 p-4" : "w-0 p-0"
        }`}
      >
        <button
          onClick={handleToggle}
          aria-label="Close menu"
          aria-expanded={isOpen}
          className="self-end mb-6 cursor-pointer hover:text-gray-300 focus:outline-none"
        >
          ✕
        </button>

        <nav className="flex flex-col gap-y-6 whitespace-nowrap">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-red-300 hover:cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>


      {/* for mobile */}

      {isOpen && (
        <div
        className="fixed inset-0 bg-black/40 z-[5] md:hidden"
        onClick={handleToggle}/>
      )}

      {/* Open toggle — shown outside the aside when collapsed */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          aria-label="Open menu"
          aria-expanded={isOpen}
          className="fixed top-4 left-4 z-20 p-2 transition-all duration-300 cursor-pointer hover:scale-105 text-slate-800 font-bold hover:text-green-900 focus:outline-none"
        >
          |||
        </button>
      )}
    </>
  );
}
