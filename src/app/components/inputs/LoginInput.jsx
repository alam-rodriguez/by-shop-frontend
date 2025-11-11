import React from "react";

import { Icon } from "@iconify/react";

const LoginInput = ({
    register,
    errors,
    type = "text",
    name,
    inputClassName,
    errorClassName = "text-red-500 text-sm ml-4 text-center",
    placeholder,
    label = "",
    labelClassName = "",
    divClassName = "flex gap-2 mt-5 flex-col",
    width = "100%",
    icon = "",
}) => {
    return (
        <>
            <div className={`bg-gray-200 w-full rounded-2xl flex items-center p-4 ${errors[name]?.message && "border border-red-500"}`}>
                <div className="grid place-content-center w-1/6">
                    <Icon icon={icon} className={`${!errors[name]?.message ? "text-gray-500" : "text-red-500"} text-2xl`} />
                </div>
                <input
                    {...register(name, { setValueAs: (value) => (value === "" ? undefined : type === "number" ? parseFloat(value) : value) })}
                    type={type}
                    className="w-5/6 appearance-none border-none bg-transparent outline-none"
                    step="any"
                    placeholder={placeholder}
                />
            </div>
            {errors[name]?.message && <span className={errorClassName}>{errors[name]?.message}</span>}
        </>
    );

    return (
        <div className={divClassName} style={{ width: width }}>
            <label htmlFor={name} className={labelClassName}>
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                step="any"
                {...register(name, { setValueAs: (value) => (value === "" ? undefined : type === "number" ? parseFloat(value) : value) })}
                className={inputClassName}
                id={name}
            />
            {errors[name]?.message && <p className={errorClassName}>{errors[name]?.message}</p>}
        </div>
    );
};

export default LoginInput;
