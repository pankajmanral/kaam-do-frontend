"use client"

import Modal from "@/components/modal/Modal"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function UserDashboard() {

    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [jobs, setJobs] = useState([])
    const [openBidsModal, setOpenBidsModal] = useState(false)
    const [selectedJobId, setSelectedJobId] = useState(null)

    useEffect(() => {

        const getData = async () => {

            const getToken = localStorage.getItem("token")
            if(!getToken){
                router.push('/')
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/viewJob`,{
                    headers: {
                        "Authorization" : `Bearer ${getToken}`,
                        "Content-Type": "application/json"
                    }
                })
                const result = await response.json()
                console.log(result)
                if (!response.ok) {
                    const errorMsg = result.error.toUpperCase()
                    throw new Error(errorMsg)
                }
                setJobs(result.data)
                // alert("Jobs fetch successfully")
            } catch (error) {
                console.log(error)
            } finally{
                setLoading(false)
            }
        }

        getData()

    }, [])

    const getBids = async(jobId) => {
        try {

            const getToken = localStorage.getItem("token")
            if(!getToken){
                alert("Invalid token")
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/jobs/${jobId}/bids`,{
                headers: {
                    "Authorization": `Bearer ${getToken}`,
                    "Content-Type": "application/json"
                }
            })
            const result = await response.json()
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <Modal isOpen={openBidsModal} onClose={()=>setOpenBidsModal(false)} >
                <>
                    <h1 className="text-xl font-thin">View <span className="font-bold">BIDS</span> for {selectedJobId}</h1>
                </>
            </Modal>

            {loading &&
                <div className={"fixed h-screen w-full flex justify-center items-center"}>
                    <h1 className={"text-center font-bold "}>Loading...</h1>
                </div>
            }

            <div className="pt-20">
                <h1 className="font-bold text-xs bg-black text-white w-fit px-3 py-1 mb-20 rounded-md">USER DASHBOARD</h1>
                <h1 className="text-xl mb-10 text-black text-center">
                    View all jobs
                </h1>

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
                                                getBids(data.id)
                                                setSelectedJobId(data.id)
                                            }}>
                                            View Bids
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