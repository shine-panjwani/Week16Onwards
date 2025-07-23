'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async(e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/auth/signup",{
        email,
        password
    })
    setEmail("")
    setPassword("")
    console.log('Signup Data:', { email, password });
    router.push("/signin")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSignup}
        className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white focus:outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded bg-gray-800 text-white focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded font-semibold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
