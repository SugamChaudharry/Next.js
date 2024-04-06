"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
import { Navbar } from "@/components";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState(false);

  const onLogin = async (event: any) => {
    event.preventDefault();

    try {
      await axios.post("/api/users/login", user);
      router.push("/");
    } catch (error: any) {
      console.log("error while login", error.message);
      toast.error(error.message);
      setError(true);
    } finally {
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    setError(false);
  }, [user]);

  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <div className="relative items-center justify-center " >
          <Navbar />
      </div>
      
      <div className="flex  items-center justify-center min-h-screen py-2 Z-20">
        <form className="h-2/3 flex flex-col justify-between items-center">
          <h1 className="text-4xl font-bold text-white relative z-20 mb-10">
            Login
          </h1>
          <input
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            className={"p-3 border border-gray-300 rounded-md mb-6 text-black relative z-20"+ (error ? " border-red-500 border-4" : "")}
          />
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            className={"p-3 border border-gray-300 rounded-md mb-6 text-black relative z-20"+ (error ? " border-red-500 border-4" : "")}
          />
          <button
            onClick={onLogin}
            disabled={buttonDisabled}
            className="bg-cyan-600 w-20 p-2 rounded-lg mb-10 relative z-20"
          >
            login
          </button>
          {!error && (
            <Link href="/signup">
              New user? <span className="text-blue-400 relative z-20">signup</span>
            </Link>
          )}
          {error && (
            <Link href="/signup">
              <span className="text-red-600">User not found</span> <span className="text-blue-400 relative z-20">signup</span>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}
