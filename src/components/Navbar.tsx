'use client';
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
  return (
    <div
    className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
        <Menu setActive={setActive} >
            <Link href={"/"}>
                <MenuItem item="Home" active={active} setActive={setActive}>
                    
                </MenuItem>
            </Link>
            <MenuItem item="Our courses" active={active} setActive={setActive}>
              <div className="flex flex-col space-y-4 text-sm" >
              <HoveredLink href="#">All courses</HoveredLink> 
              <HoveredLink href="#">Basic Music Theory</HoveredLink> 
              <HoveredLink href="#">Advanced Composition</HoveredLink> 
              <HoveredLink href="#">Songwriting</HoveredLink> 
              <HoveredLink href="#">Music production</HoveredLink> 
              </div>
            </MenuItem>
            <Link href={"/contact"}>
                <MenuItem item="Contact Us" active={active} setActive={setActive}>
                    
                </MenuItem>
            </Link>
        </Menu>
    </div>
  )
}

export default Navbar