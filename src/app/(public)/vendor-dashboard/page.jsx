"use client"

import { useState, useEffect } from "react"

export default function VendorDashboard() {

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getToken = localStorage.getItem("token")
        // console.log(getToken)

        const getJobs = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/jobListing`, {
                    headers: {
                        "Authorization": `Bearer ${getToken}`,
                        "Content-Type": "application/json"
                    }
                })

                if (!response.ok) {
                    throw new Error("Unable to load data")
                }

                const result = await response.json()
                setJobs(result.data)
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false)
            }
        }

        getJobs()

    }, [])

    return (
        <>
            {loading &&
                <div className={"fixed h-screen w-full flex justify-center items-center"}>
                    <h1 className={"text-center font-bold "}>Loading...</h1>
                </div>
            }

            <div className="pt-20">
                <h1 className="text-2xl mb-10 text-black font-bold underline">
                    View jobs
                </h1>

                <table className="w-full border-collapse">
                    {/* TABLE HEADER (Desktop only) */}
                    <thead className="hidden md:table-header-group bg-black text-white">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">SR.NO</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">POSTED BY</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">JOB TYPE</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">DETAILS</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">LOCATION</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">DATE</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>

                    <tbody className="block md:table-row-group">
                        {!loading && jobs.length > 0 &&
                            jobs.map((data, key) => (
                                <tr
                                    key={key}
                                    className="block md:table-row border border-gray-200 rounded-lg md:rounded-none mb-6 md:mb-0 p-4 md:p-0 hover:bg-gray-50 transition"
                                >

                                    <td className="flex md:table-cell justify-between py-2 md:px-4 md:py-3 text-sm">
                                        <span className="font-semibold md:hidden">SR.NO</span>
                                        <span>{jobs.length}</span>
                                    </td>

                                    <td className="flex md:table-cell justify-between py-2 md:px-4 md:py-3 text-sm">
                                        <span className="font-semibold md:hidden">POSTED BY</span>
                                        <span>{data.postedBy}</span>
                                    </td>

                                    <td className="flex md:table-cell justify-between py-2 md:px-4 md:py-3 text-sm">
                                        <span className="font-semibold md:hidden">JOB TYPE</span>
                                        <span>{data.jobName}</span>
                                    </td>

                                    <td className="flex md:table-cell justify-between py-2 md:px-4 md:py-3 text-sm">
                                        <span className="font-semibold md:hidden">DETAILS</span>
                                        <span className="text-right md:text-left">
                                            {data.details}
                                        </span>
                                    </td>

                                    <td className="flex md:table-cell justify-between py-2 md:px-4 md:py-3 text-sm">
                                        <span className="font-semibold md:hidden">LOCATION</span>
                                        <span>{data.location}</span>
                                    </td>

                                    <td className="flex md:table-cell justify-between py-2 md:px-4 md:py-3 text-sm">
                                        <span className="font-semibold md:hidden">DATE</span>
                                        <span>{data.schedule_date}</span>
                                    </td>

                                    <td className="mt-3 md:mt-0 md:table-cell md:px-4 md:py-3">
                                        <button className="w-full md:w-auto border border-black px-4 py-1.5 text-sm hover:bg-black hover:text-white transition">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}