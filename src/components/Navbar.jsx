"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="w-full h-16 fixed top-0 left-0 z-50 flex justify-between items-center px-4 bg-black text-white">
                <Link href="/">Logo</Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-4 items-center">
                    <li className={"cursor-pointer"}>Pankaj</li>
                    <li className={"cursor-pointer"}>Pankaj</li>
                    <li className={"cursor-pointer"}>Pankaj</li>
                    <button className="border border-white px-3 py-1">
                        Logout
                    </button>
                </ul>

                {/* Mobile Toggle Button */}
                <button className="md:hidden border border-white px-3 py-1" onClick={() => setIsOpen(!isOpen)}>
                    Menu
                </button>
            </div>

            {/* Mobile Slide Menu */}
            <div className={` fixed top-0 left-0 h-screen w-64 bg-black text-white z-40 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <ul className="flex flex-col gap-4 p-6 mt-12">
                    <li className={"cursor-pointer"}>Pankaj</li>
                    <li className={"cursor-pointer"}>Pankaj</li>
                    <li className={"cursor-pointer"}>Pankaj</li>
                    <button className="border border-white px-3 py-1">
                        Logout
                    </button>
                </ul>
            </div>
        </>
    )
}
