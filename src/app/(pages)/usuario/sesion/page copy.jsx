"use client";

import React, { useState } from "react";

// Components
import Divider from "@/app/components/home/Divider";

// React Hook Form
import { useForm } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useChangeUserEmailVerified,
    useGetCodeValidation,
    useLoginUser,
    useRegisterUser,
    useRequestsUsers,
    useUserExist,
} from "@/app/hooks/request/users/requestsUsers";
import { validate } from "uuid";
import appSettings from "@/app/zustand/app/zusApp";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";

const page = () => {
    const { appName } = appSettings();

    const { useGetUserInformation } = useRequestsUsers();

    const router = useRouter();

    const schema = z.object({
        email: z.string().email("El correo electronico no es valido"),
        name: z.string().optional(),
        password: z.string().min(6, "La contraseña debe tener al menos seis caracteres").optional(),
        code: z.string().max(6).optional(),
    });

    const schema2 = z.object({
        email: z.string().email("El correo electronico no es valido"),
        name: z.string().min(6),
        password: z.string().min(6, "La contraseña debe tener al menos seis caracteres"),
        code: z.string().max(6).optional(),
    });

    const schema3 = z.object({
        code: z.number(),
    });

    const schema5 = z.object({
        password: z.string().min(6, "La contraseña debe tener al menos seis caracteres"),
    });

    const [page, setPage] = useState(1);
    // 1  = valisar si email existe
    // 2 = proceder a crear cuenta
    // 3 = Crear cuenta
    // 4 = verificar cuenta
    // 5 = iniciar sesion

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        setValue,
        getValues,
        setError,
        reset,
    } = useForm({
        resolver: zodResolver(page === 1 ? schema : page === 3 ? schema2 : page == 4 ? schema3 : page === 5 ? schema5 : schema),
    });

    const validateEmail = async (data) => {
        console.log(data);
        const userExist = await useUserExist(data.email);
        console.log(userExist);
        if (!userExist) setPage(2);
        else setPage(5);
    };
    const createAccount = async (data) => {
        console.log(data);
        const res = await useRegisterUser(data);
        console.log(res);
        setPage(4);
    };

    const [code, setcode] = useState("123456");

    const validateCode = async (data) => {
        const code = await useGetCodeValidation(watch("email"));
        console.log(code);
        if (code != data.code) {
            alert("Error");
            return;
        }
        const res = await useChangeUserEmailVerified(watch("email"), 1);
        useGetUserInformation();
        toast.info("Sesion iniciada");
        router.push("/usuario");
    };

    const iniciarSesion = async (data) => {
        console.log(data);
        const { status, data: resData, message, passwordIsValid } = await useLoginUser(watch("email"), data.password);
        if (!passwordIsValid) {
            setError("password", { message: message });
            return;
        }
        useGetUserInformation();
        // const res = await useChangeUserEmailVerified(watch("email"), 1);
        // console.log(res);
        toast.info("Sesion iniciada");
        router.push("/usuario");
    };

    const handleClickRegisterUser = () => {
        // schema.required();
        const requiredSchema = schema.required();
        setPage(3);
    };

    if (page === 1)
        return (
            <form noValidate onSubmit={handleSubmit(validateEmail)}>
                <Toaster richColors />
                <div className="bg-gray-300 py-4">
                    <p className="text-center font-semibold text-xl">{appName}</p>
                </div>
                <div className="m-4">
                    <p className="text-lg font-semibold">Iniciar sesion o crear una cuenta</p>
                    <p></p>
                    <Input
                        register={register}
                        errors={errors}
                        type="email"
                        name="email"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Ingresa el numero de celular o correo electronico"
                        labelClassName="font-semibold"
                    />

                    <button className="bg-orange-400 p-3 rounded-3xl w-full mt-8 mb-4">Continuar</button>

                    <p className="text-xs">
                        Al continuar, aceptas las <span className="underline text-blue-700">Condiciones de uso</span> y el{" "}
                        <span className="underline text-blue-700">Aviso de privacidad</span> de Amazon
                    </p>
                    <p className="text-blue-700 mt-4">Necesitas ayuda?</p>
                </div>
                <Divider h={2.5} />
                <div className="m-4">
                    <div className="flex justify-between">
                        <p className="text-blue-700 text-sm">Condiciones de uso</p>
                        <p className="text-blue-700 text-sm">Aviso de Privacidad</p>
                        <p className="text-blue-700 text-sm">Ayuda</p>
                    </div>
                    <p className="text-xs text-center mt-3 text-gray-500">1996-2023, Amazon.com, Inc. o sus afiliados</p>
                </div>
            </form>
        );
    if (page === 2)
        return (
            <form noValidate>
                <div className="bg-gray-300 py-4">
                    <p className="text-center font-semibold text-xl">amazon</p>
                </div>
                <div className="m-4">
                    <p className="text-lg font-semibold">Parece que eres nuevo en Amazon</p>
                    <div className="flex gap-4">
                        <p>{watch("email")}</p>
                        <p>Cambiar</p>
                    </div>
                    <p>Creemos una cuenta usando tu correo electronico</p>

                    {/* <Input
                        register={register}
                        errors={errors}
                        type="email"
                        name="email"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Ingresa el numero de celular o correo electronico"
                        labelClassName="font-semibold"
                    /> */}

                    <button className="bg-orange-400 p-3 rounded-3xl w-full mt-8 mb-4" onClick={handleClickRegisterUser}>
                        Proceder a crear una cuenta
                    </button>

                    <Divider h={1} />

                    {/* <p className="text-xs">
                        Al continuar, aceptas las <span className="underline text-blue-700">Condiciones de uso</span> y el{" "}
                        <span className="underline text-blue-700">Aviso de privacidad</span> de Amazon
                    </p> */}
                    <p className="mt-4">Ya eres cliente?</p>

                    <p className="text-blue-700 mt-4">Iniciar sesion con otro correo electronico o celular</p>
                </div>
                <Divider h={2.5} />
                <div className="m-4">
                    <div className="flex justify-between">
                        <p className="text-blue-700 text-sm">Condiciones de uso</p>
                        <p className="text-blue-700 text-sm">Aviso de Privacidad</p>
                        <p className="text-blue-700 text-sm">Ayuda</p>
                    </div>
                    <p className="text-xs text-center mt-3 text-gray-500">1996-2023, Amazon.com, Inc. o sus afiliados</p>
                </div>
            </form>
        );

    if (page === 3)
        return (
            <form noValidate onSubmit={handleSubmit(createAccount)} className="bg-gray-200">
                <div className="bg-gray-300 py-4">
                    <p className="text-center font-semibold text-xl">amazon</p>
                </div>
                <div className="m-4 bg-white p-4 border border-gray-400 rounded-lg">
                    {/* <p className="text-lg font-semibold">Crear cuenta</p>
                    <div className="flex gap-4">
                        <p>{watch("email")}</p>
                        <p>Cambiar</p>
                    </div>
                    <p>Creemos una cuenta usando tu correo electronico</p> */}

                    <Input
                        register={register}
                        errors={errors}
                        type="email"
                        name="email"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Ingresa el numero de celular o correo electronico"
                        labelClassName="font-semibold"
                    />

                    <Input
                        register={register}
                        errors={errors}
                        type="text"
                        name="name"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Nombres y apellidos"
                        labelClassName="font-semibold"
                    />

                    <Input
                        register={register}
                        errors={errors}
                        type="password"
                        name="password"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Ingresa el numero de celular o correo electronico"
                        labelClassName="font-semibold"
                    />

                    <div>
                        <i></i>
                        <p>La contraseña debe tener al menos seis caracteres</p>
                    </div>

                    <button className="bg-orange-400 p-3 rounded-3xl w-full mt-8 mb-4">Verificar correo electronico</button>

                    <Divider h={1} />

                    {/* <p className="text-xs">
                        Al continuar, aceptas las <span className="underline text-blue-700">Condiciones de uso</span> y el{" "}
                        <span className="underline text-blue-700">Aviso de privacidad</span> de Amazon
                    </p> */}
                    <p className="mt-4">Ya eres cliente?</p>
                    <p className="text-blue-700 mt-4">Iniciar sesion con otro correo electronico o celular</p>
                </div>
                <Divider h={2.5} />
                <div className="m-4">
                    <div className="flex justify-between">
                        <p className="text-blue-700 text-sm">Condiciones de uso</p>
                        <p className="text-blue-700 text-sm">Aviso de Privacidad</p>
                        <p className="text-blue-700 text-sm">Ayuda</p>
                    </div>
                    <p className="text-xs text-center mt-3 text-gray-500">1996-2023, Amazon.com, Inc. o sus afiliados</p>
                </div>
            </form>
        );

    if (page === 4)
        return (
            <form noValidate onSubmit={handleSubmit(validateCode)} className="bg-gray-200">
                <div className="bg-gray-300 py-4">
                    <p className="text-center font-semibold text-xl">amazon</p>
                </div>
                <div className="m-4 bg-white p-4 border border-gray-400 rounded-lg">
                    <p className="text-xl font-semibold">Verificar direccion de correo electronico</p>
                    {/* <div className="flex gap-4">
                        <p>{watch("email")}</p>
                        <p>Cambiar</p>
                    </div> */}
                    <p className="mt-3 tracking-wide">
                        Para verificar tu correo electronico, hemos enviado un codigo a {watch("email")}{" "}
                        <span className="text-blue-700">(Cambiar)</span>
                    </p>

                    {/* <Input
                        register={register}
                        errors={errors}
                        type="email"
                        name="email"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Ingresa el numero de celular o correo electronico"
                        labelClassName="font-semibold"
                    /> */}

                    {/* <Input
                        register={register}
                        errors={errors}
                        type="text"
                        name="name"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Nombres y apellidos"
                        labelClassName="font-semibold"
                    /> */}

                    <Input
                        register={register}
                        errors={errors}
                        type="number"
                        name="code"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label="Ingresa el codigo de seguridad"
                        labelClassName="font-semibold"
                    />

                    {/* <div>
                        <i></i>
                        <p>La contraseña debe tener al menos seis caracteres</p>
                    </div> */}

                    <button className="bg-orange-400 p-3 rounded-3xl w-full mt-8 mb-4">Crea tu cuenta de Amazon</button>

                    <Divider h={1} />

                    <p className="text-xs">
                        Al crear una cuenta, aceptas las <span className="underline text-blue-700">Condiciones de uso</span> y el{" "}
                        <span className="underline text-blue-700">Aviso de privacidad</span> de Amazon
                    </p>
                    {/* <p className="mt-4">Ya eres cliente?</p> */}
                    <p className="text-blue-700 mt-4">Reenviar codigo</p>
                </div>
                <Divider h={2.5} />
                <div className="m-4">
                    <div className="flex justify-between">
                        <p className="text-blue-700 text-sm">Condiciones de uso</p>
                        <p className="text-blue-700 text-sm">Aviso de Privacidad</p>
                        <p className="text-blue-700 text-sm">Ayuda</p>
                    </div>
                    <p className="text-xs text-center mt-3 text-gray-500">1996-2023, Amazon.com, Inc. o sus afiliados</p>
                </div>
            </form>
        );
    if (page === 5)
        return (
            <form noValidate onSubmit={handleSubmit(iniciarSesion)}>
                <div className="bg-gray-300 py-4">
                    <p className="text-center font-semibold text-xl">amazon</p>
                </div>
                <div className="m-4">
                    <p className="text-lg font-semibold">Iniciar sesion o crear una cuenta</p>
                    <Input
                        register={register}
                        errors={errors}
                        type="password"
                        name="password"
                        inputClassName="border-2 border-gray-300 rounded-md p-2"
                        errorClassName="text-red-700"
                        placeholder=""
                        label={watch("email")}
                        labelClassName="font-semibold"
                    />

                    <button className="bg-orange-400 p-3 rounded-3xl w-full mt-8 mb-4">Iniciar sesion</button>

                    <p className="text-xs">
                        Al continuar, aceptas las <span className="underline text-blue-700">Condiciones de uso</span> y el{" "}
                        <span className="underline text-blue-700">Aviso de privacidad</span> de Amazon
                    </p>
                    <p className="text-blue-700 mt-4">Necesitas ayuda?</p>
                </div>
                <Divider h={2.5} />
                <div className="m-4">
                    <div className="flex justify-between">
                        <p className="text-blue-700 text-sm">Condiciones de uso</p>
                        <p className="text-blue-700 text-sm">Aviso de Privacidad</p>
                        <p className="text-blue-700 text-sm">Ayuda</p>
                    </div>
                    <p className="text-xs text-center mt-3 text-gray-500">1996-2023, Amazon.com, Inc. o sus afiliados</p>
                </div>
            </form>
        );
};

export default page;
