"use client"

import "./formInput.css";

export default function TextField({
    type="text",
    maxLength,
    minLength,
    label,
    error,
    register,
    name,
    rules = {},
    onChange
}){

    return(
        <>
            <div className={"form-group"}>

                <input
                    tpye={type}
                    maxLength={maxLength}
                    minLength={minLength}
                    {...register(name, rules)}
                    placeholder={label}
                    onChange={onChange}
                />

                <label>
                    {label}
                </label>

                {error && <p className="error-msg">{error.message}</p>}

            </div>
        </>
    )
}