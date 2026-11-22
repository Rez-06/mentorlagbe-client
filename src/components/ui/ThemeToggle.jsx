"use client";

import { useEffect, useState } from "react";
import { PiSunDuotone, PiMoonStarsDuotone } from "react-icons/pi";

export default function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "mentordark");
  }, []);

  const toggle = () => {
    const next = dark ? "mentorlight" : "mentordark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("ml_theme", next);
    } catch {}
    setDark(!dark);
  };

  return (
    <button onClick={toggle} aria-label="Toggle dark mode" title={dark ? "Switch to light" : "Switch to dark"} className={`grid h-10 w-10 place-items-center rounded-xl transition ${className}`}>
      {dark ? <PiSunDuotone size={20} /> : <PiMoonStarsDuotone size={20} />}
    </button>
  );
}