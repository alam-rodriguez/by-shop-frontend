const Input = ({ register, errors, type = "text", name, inputClassName, errorClassName = "text-red-700", placeholder }) => {
    if (type !== "textarea")
        return (
            <>
                <input type={type} placeholder={placeholder} {...register(name)} className={inputClassName} />
                {errors[name]?.message && <p className={errorClassName}>{errors[name]?.message}</p>}
            </>
        );

    return (
        <>
            <textarea {...register(name)} className={inputClassName} placeholder={placeholder}></textarea>
            {errors[name]?.message && <p className={errorClassName}>{errors[name]?.message}</p>}
        </>
    );
};

export default Input;
