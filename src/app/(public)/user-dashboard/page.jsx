"use client"

import { useState } from "react"

export default function UserDashboard() {

    const [loading, setLoading] = useState(true)

    return (
        <>
            {loading &&
                <div className={"fixed h-screen w-full flex justify-center items-center"}>
                    <h1 className={"text-center font-bold "}>Loading...</h1>
                </div>
            }

            <div className="pt-20">
                <h1 className="text-2xl mb-10 text-black font-bold underline">
                    User Dashboard page
                </h1>
            </div>

        </>
    )
}