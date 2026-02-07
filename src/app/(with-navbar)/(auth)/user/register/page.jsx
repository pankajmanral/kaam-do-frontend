"use client"

import TextField from "@/components/form-components/TextField";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function UserRegister() {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })

    const router = useRouter()

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    password: data.password,
                    gender: data.gender,
                    location: data.location
                })
            })
            if (!response.ok) {
                throw new Error("Unable to post data")
            }
            router.push("/user/login")
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <div className={"pt-20 h-full w-full flex flex-col justify-center items-center"}>
                <h1 className={"text-2xl mb-14 text-black font-bold underline"}>Vendor register page</h1>

                <form className={"w-full sm:max-w-[40rem]"} onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-row">
                        {/* user name */}
                        <TextField
                            minLength={3}
                            maxLength={40}
                            label="Enter user name"
                            name="name"
                            register={register}
                            rules={{
                                required: "User name is required",
                                minLength: {
                                    value: "3",
                                    message: "Name should be atleast 3 characters long"
                                }
                            }}
                            error={errors.name}
                        />

                        {/* vendor phone number */}
                        <TextField
                            maxLength={10}
                            label="Enter phone number"
                            name="phone"
                            register={register}
                            rules={{
                                required: "Phone number is required",
                                minLength: {
                                    value: "10",
                                    message: "Phone number should be 10 digits"
                                }
                            }}
                            error={errors.phone}
                        />
                    </div>

                    <div className="form-row">

                        {/* vendor email */}
                        <TextField
                            minLength={3}
                            maxLength={100}
                            label="Enter email"
                            name="email"
                            register={register}
                            // rules={{
                            //     minLength: {
                            //         value: "3",
                            //         message: "Name should be atleast 3 characters long"
                            //     }
                            // }}
                            error={errors.email}
                        />

                        {/* vendor phone number */}
                        <TextField
                            maxLength={40}
                            label="Enter password"
                            name="password"
                            register={register}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: "8",
                                    message: "Password should be atleast 8 characters long"
                                }
                            }}
                            error={errors.password}
                        />

                    </div>

                    <div className="form-row">

                        {/* gender */}
                        <div className="form-group">
                            <select
                                {...register("gender", {
                                    required: "Gender is required"
                                })}
                            >
                                <option value=""></option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <label>Gender</label>

                            {errors.gender && <p className="error-msg">{errors.gender.message}</p>}
                        </div>

                        {/* location */}
                        <div className="form-group">
                            <select
                                {...register("location", {
                                    required: "Location is required"
                                })}
                            >
                                <option value=""></option>
                                <option value="mumbai">Mumbai</option>
                                <option value="pune">Pune</option>
                            </select>
                            <label>Location</label>

                            {errors.location && <p className="error-msg">{errors.location.message}</p>}
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <PrimaryButton buttonLabel={"Register"} buttonType={"submit"} />
                    </div>

                    <div className="w-full flex justify-end">
                        <Link href="/user/login" className="text-xs text-black">
                            Already a user ?
                        </Link>
                    </div>

                </form>

            </div>
        </>
    )
}