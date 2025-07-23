'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
export default function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSignin =async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signin Data:', { email, password });
    const res = await signIn("credentials",{
      email,
      password,
      redirect:false
    })
    console.log(res);
    
    if(res?.ok){
      router.push("/")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSignin}
        className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

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
          Sign In
        </button>
      </form>
    </div>
  );
}
