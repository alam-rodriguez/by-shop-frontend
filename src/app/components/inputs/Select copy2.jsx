import React from "react";

const Select = ({ register, errors, name, items, type = "text", selectClassName, errorClassName = "text-red-700", optionNameForShow = "name" }) => {
    return (
        <>
            <select
                {...register(name, {
                    type: { type },
                    setValueAs: (value) => (value === "" ? undefined : type == "number" ? parseFloat(value) : value),
                })}
                className={selectClassName}
            >
                {items.map((item) => (
                    <option value={item.id} key={item.id}>
                        {item[optionNameForShow]}
                    </option>
                ))}
            </select>
            {errors[name]?.message && <p className={errorClassName}>{errors[name]?.message}</p>}
        </>
    );
};

export default Select;
