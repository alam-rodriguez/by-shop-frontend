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
    useCreateCodeVerificationEmail,
    useGetCodeValidation,
    useLoginUser,
    useRegisterUser,
    useRequestsUsers,
    useUserEmailIsVerified,
    useUserExist,
} from "@/app/hooks/request/users/requestsUsers";
import { validate } from "uuid";
import appSettings from "@/app/zustand/app/zusApp";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

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

    const [state, setState] = useState(1);
    // 1 = registrar
    // 2 = logear
    // 3 = verificar email
    // 4 = insertar datos

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
        console.log({ status, data: resData, message, passwordIsValid });
        if (!passwordIsValid) {
            console.log("ggg");
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

    const handleClickSignUp = async () => {
        const email = watch("email");
        const password = watch("password");
        const name = watch("name");
        const userExist = await useUserExist(email);
        const emailIsVerified = await useUserEmailIsVerified(email);

        console.log(userExist);
        console.log(emailIsVerified);

        if (userExist && !emailIsVerified) {
            await useCreateCodeVerificationEmail(email);
            setState(4);
            return;
        }
        console.log("Hola Mundo");

        if (userExist) {
            toast.info("El usuario ya existe");
            return;
        }
        setState(3);
    };

    const registerUser = async () => {
        const email = watch("email");

        console.log("Registrar usuario");
        const password = watch("password");
        const name = watch("name");
        const newUserData = {
            email,
            password,
            name,
        };
        const res = await useRegisterUser(newUserData);
        console.log(res);
        setState(4);
    };

    const handleClickLogIn = async () => {
        const email = watch("email");
        const password = watch("password");
        const userExist = await useUserExist(email);
        if (!userExist) {
            toast.info("El usuario no existe");
            return;
        }

        const emailIsVerified = await useUserEmailIsVerified(email);

        if (!emailIsVerified) {
            await useCreateCodeVerificationEmail(email);
            setState(4);
            return;
        }

        const { status, data: resData, message, passwordIsValid } = await useLoginUser(email, password);
        if (!passwordIsValid) {
            setError("password", { message: message });
            toast.error(message);
            return;
        }
        useGetUserInformation();
        toast.info("Sesion iniciada");
        router.push("/usuario");
    };

    const validateEmailCode = async () => {
        const email = watch("email");
        const codeDataBase = await useGetCodeValidation(email);
        const codeUser = watch("code");
        console.log(code);
        console.log(codeDataBase);
        if (codeDataBase != codeUser) {
            toast.error("Codigo incorrecto");
            alert("Error");
            return;
        }
        const res = await useChangeUserEmailVerified(email, 1);
        useGetUserInformation();
        toast.info("Sesion iniciada");
        router.push("/usuario");
    };

    return (
        <form className="p-4 flex flex-col gap-8 justify-center h-dvh">
            <Toaster richColors />
            <Icon icon="mynaui:arrow-left" className="absolute top-0 left-0 m-8 text-3xl" onClick={() => router.push("/")} />
            <p className="text-5xl font-bold w-3/4">
                {state == 1
                    ? "Create your Account"
                    : state == 2
                    ? "Log in to your Account"
                    : state == 3
                    ? "Verify your Email"
                    : state == 4
                    ? "Insert your Data"
                    : "Iniciar Sesion"}
            </p>
            {(state == 1 || state == 2) && (
                <div className="flex flex-col gap-4">
                    <div className="bg-gray-200 w-full rounded-2xl flex items-center p-4">
                        <div className="grid place-content-center w-1/6">
                            <Icon icon="majesticons:mail" className="text-gray-500 text-2xl" />
                        </div>
                        <input
                            {...register("email")}
                            // errors={errors}
                            name="email"
                            type="email"
                            className="w-5/6 appearance-none border-none bg-transparent outline-none"
                        />
                    </div>
                    <div className="bg-gray-200 w-full rounded-2xl flex items-center p-4">
                        <div className="grid place-content-center w-1/6">
                            <Icon icon="mdi:password" className="text-gray-500 text-2xl" />
                        </div>
                        <input
                            {...register("password")}
                            // errors={errors}
                            name="password"
                            type="password"
                            className="w-5/6 appearance-none border-none bg-transparent outline-none"
                        />
                    </div>
                </div>
            )}

            {state == 3 && (
                <div className="bg-gray-200 w-full rounded-2xl flex items-center p-4">
                    <div className="grid place-content-center w-1/6">
                        <Icon icon="lets-icons:user-fill" className="text-gray-500 text-2xl" />
                    </div>
                    <input
                        {...register("name")}
                        // errors={errors}
                        name="name"
                        type="text"
                        className="w-5/6 appearance-none border-none bg-transparent outline-none"
                        placeholder="Ingrese su nombre de usuario"
                    />
                </div>
            )}
            {state == 4 && (
                <div className="bg-gray-200 w-full rounded-2xl flex items-center p-4">
                    <div className="grid place-content-center w-1/6">
                        <Icon icon="tabler:password" className="text-gray-500 text-2xl" />
                    </div>
                    <input
                        {...register("code")}
                        // errors={errors}
                        name="code"
                        type="number"
                        className="w-5/6 appearance-none border-none bg-transparent outline-none"
                        placeholder="Ingresa tu código de verificación"
                    />
                </div>
            )}
            <div className="flex justify-center items-center gap-2">
                <input type="checkbox" className="size-4" />
                <p className="text-xs font-bold">Remenber Me</p>
            </div>
            <button
                className="bg-black text-white p-4 rounded-full w-full"
                type="button"
                onClick={
                    state == 1 ? handleClickSignUp : state == 2 ? handleClickLogIn : state == 3 ? registerUser : state == 4 ? validateEmailCode : null
                }
            >
                {state == 1 || state == 3 ? "Sign up" : state == 2 ? "Log in" : state == 4 ? "Verify" : "Iniciar Sesion"}
            </button>

            <div className="flex gap-2 items-center text-gray-500">
                <hr className="flex-1 border-gray-300" />
                <p className="flex-1 text-center">or continue with</p>
                <hr className="flex-1 border-gray-300" />
            </div>
            <div className="flex justify-around">
                <div className="grid place-content-center border border-gray-300 rounded-xl h-16 w-24">
                    <Icon icon="material-icon-theme:google" className="text-2xl" />
                </div>
                <div className="grid place-content-center border border-gray-300 rounded-xl h-16 w-24">
                    <Icon icon="material-icon-theme:google" className="text-2xl" />
                </div>
                <div className="grid place-content-center border border-gray-300 rounded-xl h-16 w-24">
                    <Icon icon="material-icon-theme:google" className="text-2xl" />
                </div>
            </div>

            {state == 1 ? (
                <p className="text-center text-gray-500">
                    Already have an account?{" "}
                    <span className="text-black cursor-pointer" onClick={() => setState(2)}>
                        Sign in
                    </span>
                </p>
            ) : state == 2 ? (
                <p className="text-center text-gray-500">
                    Dont have an account?{" "}
                    <span className="text-black cursor-pointer" onClick={() => setState(1)}>
                        Log in
                    </span>
                </p>
            ) : null}
        </form>
    );

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
