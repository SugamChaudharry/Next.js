"use client";
import React, { use, useEffect, useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/users/me");
        console.log(response.data.data);
        setUser(true);
      } catch (error) {
        toast.error("Error");
      }
    }
    fetchData();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out");
      router.push("/");
      setUser(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem
            item="Home"
            active={active}
            setActive={setActive}
          ></MenuItem>
        </Link>
        <Link href={"/courses"}>
          <MenuItem
            item="Our courses"
            active={active}
            setActive={setActive}
          ></MenuItem>
        </Link>
        <Link href={"/contact"}>
          <MenuItem
            item="Contact Us"
            active={active}
            setActive={setActive}
          ></MenuItem>
        </Link>
        {user ? (
            <button onClick={logout}>
              <MenuItem
                item="Logout"
                active={active}
                setActive={setActive}
              ></MenuItem>
            </button>
        ) : (
          <div className="flex">
            <Link href={"/login"}>
              <MenuItem
                item="Login"
                active={active}
                setActive={setActive}
              ></MenuItem>
            </Link>
            <p className="px-1">/</p>
            <Link href={"/signup"}>
              <MenuItem
                item="Signup"
                active={active}
                setActive={setActive}
              ></MenuItem>
            </Link>
          </div>
        )}
      </Menu>
    </div>
  );
}

export default Navbar;
