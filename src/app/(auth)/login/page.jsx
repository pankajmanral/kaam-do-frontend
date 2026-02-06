"use client"

import TextField from "@/components/form-components/TextField";
import {useForm} from "react-hook-form";

export default function Login(){

    const { register, handleSubmit, formState:{errors} } = useForm({ mode: "onBlur" })

    return(
        <>
            <div className={"pt-20 h-screen w-full flex flex-col justify-center items-center"}>
                <h1>Login page</h1>
                <form >

                    {/*phone number */}
                    <TextField
                        type="text"
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
                    />

                    {/*password*/}
                    <TextField
                        type="text"
                        label="Enter password"
                        maxLength={10}
                        register={register}
                        name="password"
                        rules={{
                            required: "Password is required"
                        }}
                        error={errors.password}
                    />

                </form>
            </div>
        </>
    )
}