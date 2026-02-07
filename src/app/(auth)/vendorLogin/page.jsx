"use client"

import TextField from "@/components/form-components/TextField";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function VendorLogin() {

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })

    const handleNumberInput = (e) => {
        // Remove all non-numeric characters
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }

    const onSubmit = async (data) => {
        try {
            console.log(process.env.NEXT_PUBLIC_API)
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/vendorLogin`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"                      
                },
                body: JSON.stringify({
                    phone: data.phoneNumber,    
                    password: data.password
                })
            })       
            if(!response.ok){
                throw new Error("Invalid Phone number or password")
            }
            const result = await response.json()
            localStorage.setItem("token", result.data.token)
            // console.log("TOKEN "+result.data.token)
            router.push("/vendor-dashboard")
        } catch (error) {
            alert(error)
        }
    };

    return (
        <>
            <div className={"pt-20 h-screen w-full flex flex-col justify-center items-center"}>
                <h1 className={"text-2xl mb-14 text-black font-bold underline"}>Login page</h1>
                <form className={"w-full sm:max-w-80"} onSubmit={handleSubmit(onSubmit)}>

                    {/*Phone number*/}
                    <TextField
                        label="Enter phone number"
                        maxLength={10}
                        register={register}
                        name="phoneNumber"
                        rules={{
                            required: "Phone number is required",
                            minLength: {
                                value: "10",
                                message: "Phone number must be 10 digits"
                            }
                        }}
                        error={errors.phoneNumber}
                        onChange={handleNumberInput}
                    />

                    {/*Password*/}
                    <TextField
                        type="password"
                        label="Enter password"
                        minLength={8}
                        register={register}
                        name="password"
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: "8",
                                message: "Password should be atleast 8 charcters long"
                            }
                        }}
                        error={errors.password}
                    />

                    <div className="flex justify-center items-center mb-4">
                        <PrimaryButton buttonType="submit" buttonLabel="Submit" />
                    </div>

                    <div className="w-full flex justify-end">
                        <Link href="/vendorRegister" className="text-xs text-black">
                            Not a user ?
                        </Link>
                    </div>

                </form>
            </div>
        </>
    )
}