import React from "react";

import SelectRact from "react-select";

// REACT HOOK FORM
import { Controller } from "react-hook-form";

const Select = ({
    register,
    errors,
    name,
    items,
    type = "text",
    selectClassName,
    errorClassName = "text-red-700",
    optionNameForShow = "name",
    optionKeyValue = "id",
    label = "",
    control,
    isMulti = false,
    itemSelected = undefined,
    width = "100%",
    optionByDefaultText = "",
    optionByDefaultValue = "",
    onChange = () => {},
}) => {
    if (!isMulti)
        return (
            <div className="flex gap-2 mt-5 flex-col" style={{ width: width }}>
                <label htmlFor={name}>{label}</label>
                <select
                    {...register(name, {
                        type: { type },
                        setValueAs: (value) => (value === "" ? undefined : type == "number" ? parseFloat(value) : value),
                    })}
                    className={selectClassName}
                    id={name}
                    value={itemSelected}
                    defaultValue={optionByDefaultValue}
                    // onChange={() => onChange()}
                    onChange={(e) => {
                        register(name).onChange(e);
                        onChange(e.target.value); // notifica al padre
                    }}
                >
                    <option value={optionByDefaultValue} disabled={false}>
                        {optionByDefaultText || "Seleccione una opción"}
                    </option>
                    {items.map((item) => (
                        <option value={item[optionKeyValue]} key={item[optionKeyValue]}>
                            {item[optionNameForShow]}
                        </option>
                    ))}
                </select>
                {errors[name]?.message && <p className={errorClassName}>{errors[name]?.message}</p>}
            </div>
        );

    if (isMulti) {
        return (
            <div className="flex gap-2 mt-5 flex-col" style={{ width: width }}>
                <label htmlFor={name}>{label}</label>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                        <SelectRact
                            instanceId={name}
                            {...field}
                            options={items.map((item) => ({ value: item[optionKeyValue], label: item[optionNameForShow] }))}
                            isMulti
                            placeholder=""
                            // onChange={handleChangeGeneralCategories}
                            // onChange={(selectedOptions) => field.onChange(selectedOptions ? selectedOptions.map((option) => option.value) : [])}
                        />
                    )}
                />
                {errors[name]?.message && <p className={errorClassName}>{errors[name]?.message}</p>}
            </div>
        );
    }
};

export default Select;
