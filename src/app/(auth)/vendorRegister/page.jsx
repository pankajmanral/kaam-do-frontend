"use client"

import TextField from "@/components/form-components/TextField";
import PrimaryButton from "@/components/PrimaryButton";
import { useForm } from "react-hook-form";

export default function VendorRegister() {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })

    const onSubmit = async(data) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/vendorRegister`,{
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
                    location: data.location,
                    preferredWorkLocation: data.preferredWorkLocation,
                    vendorType: data.vendorType,
                    documentType: data.documentType
                })
            })
            if(!response.ok){
                throw new Error("Unable to post data")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <div className={"pt-20 h-full w-full flex flex-col justify-center items-center"}>
                <h1 className={"text-2xl mb-14"}>Vendor register page</h1>

                <form className={"w-full sm:max-w-[40rem]"} onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-row">
                        {/* vendor name */}
                        <TextField
                            minLength={3}
                            maxLength={40}
                            label="Enter vendor name"
                            name="name"
                            register={register}
                            rules={{
                                required: "Vendor name is required",
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
                            maxLength={10}
                            label="Enter password"
                            name="password"
                            register={register}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: "10",
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

                    <div className="form-row">

                        {/* gender */}
                        <div className="form-group">
                            <select
                                {...register("preferredWorkLocation", {
                                    required: "Preferred Work Location is required"
                                })}
                            >
                                <option value=""></option>
                                <option value="inside">Inside City</option>
                                <option value="outside">Outside City</option>
                                <option value="both">Both</option>
                            </select>
                            <label>Preferred Work Location</label>

                            {errors.preferredWorkLocation && <p className="error-msg">{errors.preferredWorkLocation.message}</p>}
                        </div>

                        {/* location */}
                        <div className="form-group">
                            <select
                                {...register("vendorType", {
                                    required: "Vendor Type is required"
                                })}
                            >
                                <option value=""></option>
                                <option value="individual">Individual</option>
                                <option value="company">Group</option>
                            </select>
                            <label>Vendor Type</label>

                            {errors.vendorType && <p className="error-msg">{errors.vendorType.message}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <select
                            {...register("documentType", {
                                required: "Document is required"
                            })}
                        >
                            <option value=""></option>
                            <option value="aadhar">Aadhar</option>
                            <option value="pan">Pan</option>
                            <option value="driving_license">Driving license</option>
                            <option value="voter_id">Voter ID</option>
                            <option value="passport">Passport</option>
                        </select>
                        <label>Select document</label>

                        {errors.documentType && <p className="error-msg">{errors.documentType.message}</p>}
                    </div>

                    <div className="flex justify-center">
                        <PrimaryButton buttonLabel={"Register"} buttonType={"submit"} />
                    </div>

                </form>

            </div>
        </>
    )
}