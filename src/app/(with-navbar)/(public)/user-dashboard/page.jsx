"use client"

import Modal from "@/components/modal/Modal"
import PrimaryButton from "@/components/PrimaryButton"
import { useState } from "react"
import useFetchUserJobs from "@/hooks/useFetchUserJobs"
import useGetBids from "@/hooks/useGetBids"

export default function UserDashboard() {

    // custom hook to load the posted jobs
    const { loading, jobs } = useFetchUserJobs()

    // custom hook to load the bids for the job
    const [selectedJobId, setSelectedJobId] = useState(null)
    const { bidData } = useGetBids(selectedJobId)

    const [openBidsModal, setOpenBidsModal] = useState(false)

    // function to post a new job
    const createJob = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/createJob`, {
                method: "POST",
                body: JSON.stringify({

                })
            })
        } catch (error) {

        }
    }

    return (
        <>

            {/* modal to open the bids section */}
            <Modal isOpen={openBidsModal} onClose={() => setOpenBidsModal(false)} >
                <>
                    <h1 className="text-xl font-thin">View <span className="font-bold">BIDS</span> for {selectedJobId}</h1>
                    <div>
                        {bidData.length === 0 && 
                            <p className="text-gray-500 text-center py-2">No bids received yet</p>
                        }
                        {bidData.length > 0 &&
                            <div>
                                {/* Render your bid items here */}
                            </div>
                        }
                    </div>
                </>
            </Modal>

            {/* modal to open the create job form */}
            <Modal>
                <>
                    <h1>Create new job</h1>
                    
                </>
            </Modal>

            {loading &&
                <div className={"fixed h-screen w-full flex justify-center items-center"}>
                    <h1 className={"text-center font-bold "}>Loading...</h1>
                </div>
            }

            <div className="pt-20">
                <h1 className="font-bold text-xs bg-black text-white w-fit px-3 py-1 mb-4 rounded-md">USER DASHBOARD</h1>
                <div className="flex flex-row flex-wrap justify-between items-center mb-4">
                    <h1 className="text-xl text-black text-center">
                        Posted Jobs
                    </h1>
                    <PrimaryButton
                        buttonLabel={"+ Create new job"}
                        onClick={() => setCreateJobModal(true)}
                    />
                </div>

                <table className="w-full border-collapse">
                    {/* TABLE HEADER (Desktop only) */}
                    <thead className="hidden md:table-header-group bg-black text-white">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">SR.NO</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">JOB TYPE</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">DETAILS</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">LOCATION</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">DATE</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">TIME</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">STATUS</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>

                    <tbody className="block md:table-row-group">
                        {!loading && jobs.length > 0 &&
                            jobs.map((data, index) => (
                                <tr key={index}
                                    className="block md:table-row border border-gray-200 rounded-lg md:rounded-none mb-6 md:mb-0 p-4 md:p-0 hover:bg-gray-50 transition"
                                >

                                    <td className="flex md:table-cell justify-between py-2 md:px-4 md:py-3 text-sm">
                                        <span className="font-semibold md:hidden">SR.NO</span>
                                        <span>{index + 1}</span>
                                    </td>

                                    <td className="flex md:table-cell justify-between py-2 md:px-4 md:py-3 text-sm">
                                        <span className="font-semibold md:hidden">JOB</span>
                                        <span>{data.subCategoryName}</span>
                                    </td>

                                    <td className="flex md:table-cell justify-between py-2 md:px-4 md:py-3 text-sm">
                                        <span className="font-semibold md:hidden">DETAILS</span>
                                        <span>{data.details}</span>
                                    </td>

                                    <td className="flex md:table-cell justify-between py-2 md:px-4 md:py-3 text-sm">
                                        <span className="font-semibold md:hidden">LOCATION</span>
                                        <span className="text-right md:text-left">
                                            {data.city}
                                        </span>
                                    </td>

                                    <td className="flex md:table-cell justify-between py-2 md:px-4 md:py-3 text-sm">
                                        <span className="font-semibold md:hidden">DATE</span>
                                        <span>{data.scheduled_date}</span>
                                    </td>

                                    <td className="flex md:table-cell justify-between py-2 md:px-4 md:py-3 text-sm">
                                        <span className="font-semibold md:hidden">TIME</span>
                                        <span>{data.scheduled_time}</span>
                                    </td>

                                    <td className="flex md:table-cell justify-between py-2 md:px-4 md:py-3 text-sm">
                                        <span className="font-semibold md:hidden">STATUS </span>
                                        <span>{data.status.toUpperCase()}</span>
                                    </td>

                                    <td className="mt-3 md:mt-0 md:table-cell md:px-4 md:py-3">
                                        <button className="w-full md:w-auto border border-black px-4 py-1.5 text-sm hover:bg-black hover:text-white transition cursor-pointer"
                                            onClick={() => {
                                                setOpenBidsModal(true);
                                                setSelectedJobId(data.id)
                                            }}>
                                            View Bids
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        {!loading && jobs.length === 0 &&
                            <tr>
                                <td colSpan="8" className="text-center py-8 text-gray-500">
                                    No jobs posted yet. Create one to get started!
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}