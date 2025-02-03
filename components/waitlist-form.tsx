"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");

  return (
    <form className="max-w-4xl w-full mx-auto flex flex-col md:flex-row gap-4">
      <input
        id="waitlist-form-input"
        autoFocus
        type="email"
        placeholder="Entrez votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-3 rounded-lg ring-4 ring-white focus:ring-[#F0A8BF] focus:outline-none transition-all"
      />
      <button
        type="submit"
        className="block w-full px-5 py-2 bg-primary text-primary-foreground font-semibold rounded-md outline outline-4 transition hover:outline-[#F0A8BF]"
      >
        Rejoindre la waitlist
      </button>
    </form>
  );
}
