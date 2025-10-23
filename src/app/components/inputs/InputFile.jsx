import { isValidURL } from "@/app/hooks/app/app";
import { Icon } from "@iconify/react";
import { useRef, useEffect, useState } from "react";

// REACT HOOK FORM
import { Controller } from "react-hook-form";

const InputFile = ({
    imgLink = null,
    control,
    errors,
    name,
    inputClassName,
    errorClassName = "text-red-700",
    placeholder,
    label = "",
    divClassName = "flex gap-2 mt-5 flex-col",
    width = "100%",
}) => {
    const image = useRef(null);

    const [previewUrl, setPreviewUrl] = useState(imgLink);

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const newUrl = URL.createObjectURL(file);
            setPreviewUrl((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return newUrl;
            });
        } else {
            setPreviewUrl((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return null;
            });
        }
    };

    useEffect(() => {
        return () => {
            if (isValidURL(previewUrl)) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleClick = () => image.current.click();

    return (
        <div className={divClassName} style={{ width: width }}>
            <label htmlFor={name}>{label}</label>
            <div className="flex items-center justify-center rounded-md border-2 border-dashed h-56 overflow-hidden" onClick={handleClick}>
                {previewUrl ? (
                    <img src={previewUrl} className="h-full w-full object-contain" alt="Imagen" />
                ) : (
                    <Icon icon="material-symbols:image-arrow-up-outline-rounded" width="130" height="130" />
                )}
            </div>

            <Controller
                name={name}
                control={control}
                defaultValue={null}
                render={({ field: { onChange, ref } }) => (
                    <input
                        ref={(el) => {
                            image.current = el; // aquí guardás tu referencia manual
                            ref(el); // y mantenés la referencia interna de React Hook Form
                        }}
                        type="file"
                        placeholder={placeholder}
                        onChange={(e) => {
                            onChange(e.target.files?.[0] ?? null);
                            handleChange(e);
                        }}
                        className="hidden"
                    />
                )}
            />

            {errors[name]?.message && <p className={errorClassName}>{errors[name]?.message}</p>}
        </div>
    );
};

export default InputFile;
