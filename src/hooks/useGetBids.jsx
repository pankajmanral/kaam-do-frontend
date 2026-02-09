"use client"

import { useEffect, useState } from "react"

export default function useGetBids(jobId) {

    const [bidData, setBidData] = useState([])

    useEffect(() => {
        const getBids = async () => {

            if(!jobId) return

            try {
                const getToken = localStorage.getItem("token")
                if (!getToken) {
                    alert("Invalid token")
                }
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/jobs/${jobId}/bids`, {
                    headers: {
                        "Authorization": `Bearer ${getToken}`,
                        "Content-Type": "application/json"
                    }
                })
                const result = await response.json()
                console.log("Bids data : " + result.bids)
                setBidData(result.bids)
            } catch (error) {
                console.log(error)
            }
        }

        getBids()

    }, [jobId])

    return { bidData}

}