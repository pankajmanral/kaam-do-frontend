"use client"

import "./formInput.css";

export default function TextField({
    type="text",
    maxLength,
    label,
    error,
    register,
    name,
    rules = {}
}){

    return(
        <>
            <div className={"form-group"}>

                <input
                    tpye={type}
                    maxLength={maxLength}
                    {...register(name, rules)}
                    placeholder={label}
                />

                <label>
                    {label}
                </label>

                {error && <p>{error.message}</p>}

            </div>
        </>
    )
}