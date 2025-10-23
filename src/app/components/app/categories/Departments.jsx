// React
import React, { useEffect } from "react";

// Next
import Image from "next/image";

const Departments = ({ text, departments = [] }) => {
    useEffect(() => {
        console.log(departments);
    }, [departments]);

    return (
        <div className="mx-4">
            <p className="my-2 font-bold text-xl tracking-wide">{text}</p>
            <div className="flex justify-between flex-wrap">
                {departments.map((department) => (
                    <Department key={department.id} img={department.image} text={department.short_name} link="/" />
                ))}
                {/* <Department
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    text="Todo en Belleza"
                    link="/"
                />
                <Department
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    text="Menos de $25"
                    link="/"
                />
                <Department
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    text="Menos de $25"
                    link="/"
                />
                <Department
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    text="Menos de $25"
                    link="/"
                />
                <Department
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    text="Menos de $25"
                    link="/"
                />
                <Department
                    img="https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1"
                    text="Menos de $25"
                    link="/"
                /> */}
            </div>
        </div>
    );
};

export default Departments;

const Department = ({ img, text }) => {
    return (
        <div className="mb-5" style={{ width: "calc(50% - 10px)" }}>
            {/* <img className="h-20- h-16 w-full object-cover rounded-lg" src={img} alt="" /> */}
            <Image src={img} alt="imagen" className="w-full h-16 object-cover rounded-lg" width={1920} height={1080} />
            <p className="font-medium tracking-wide">{text}</p>
        </div>
    );
};
