const Input = ({
    register,
    errors,
    type = "text",
    name,
    inputClassName,
    errorClassName = "text-red-700",
    placeholder,
    label = "",
    labelClassName = "",
    divClassName = "flex gap-2 mt-5 flex-col",
    width = "100%",
}) => {
    if (type !== "textarea" && type !== "checkbox" && type !== "radio")
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

    if (type == "checkbox")
        return (
            <div className={divClassName} style={{ width: width }}>
                <input
                    type={type}
                    placeholder={placeholder}
                    {...register(name, { setValueAs: (value) => (value === "" ? undefined : type === "number" ? parseFloat(value) : value) })}
                    className={inputClassName}
                    id={name}
                />
                <label htmlFor={name} className={labelClassName}>
                    {label}
                </label>
                {errors[name]?.message && <p className={errorClassName}>{errors[name]?.message}</p>}
            </div>
        );

    return (
        <div className={divClassName} style={{ width: width }}>
            <label htmlFor={name} className={labelClassName}>
                {label}
            </label>
            <textarea {...register(name)} className={inputClassName} placeholder={placeholder} id={name}></textarea>
            {/* <input type={type} placeholder={placeholder} {...register(name, {setValueAs: (value) => (value === "" ? undefined : type === "number" ? parseFloat(value) : value)})} className={inputClassName} id={name} /> */}
            {errors[name]?.message && <p className={errorClassName}>{errors[name]?.message}</p>}
        </div>
    );
};

export default Input;
