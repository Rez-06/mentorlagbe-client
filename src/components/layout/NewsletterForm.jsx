"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex border-t border-base-content/25"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm outline-none placeholder:text-base-content/40"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="grid w-14 place-items-center border-l border-base-content/25 transition hover:bg-accent hover:text-accent-content"
      >
        <ArrowRight size={18} />
      </button>
    </form>
  );
}