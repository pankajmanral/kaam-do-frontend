"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function useFetchUserJobs() {

    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [jobs, setJobs] = useState([])

    useEffect(() => {

        const getData = async () => {

            const getToken = localStorage.getItem("token")
            if (!getToken) {
                router.push('/')
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/viewJob`, {
                    headers: {
                        "Authorization": `Bearer ${getToken}`,
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
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        getData()

    }, [])

    return {loading, jobs}

}