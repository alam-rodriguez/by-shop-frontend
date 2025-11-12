"use client";

import React, { useEffect, useState } from "react";

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
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import Spacer from "@/app/components/home/Spacer";
import LoginInput from "@/app/components/inputs/LoginInput";
const Client = () => {
    const { appName } = appSettings();

    const { useGetUserInformation } = useRequestsUsers();

    const router = useRouter();

    const schema = z.object({
        email: z.string().email("El correo electronico no es valido"),
        name: z.string().optional(),
        password: z.string().min(6, "La contraseña debe tener al menos seis caracteres"),
        code: z.string().max(6).optional(),
        remember_me: z.boolean().transform((val) => (val ? 1 : 0)),
    });

    const schema2 = z.object({
        email: z.string().email("El correo electronico no es valido"),
        name: z.string().min(3),
        password: z.string().min(6, "La contraseña debe tener al menos seis caracteres"),
        code: z.string().max(6).optional(),
        remember_me: z.boolean().transform((val) => (val ? 1 : 0)),
    });

    const schemaCode = z.object({
        email: z.string().email("El correo electronico no es valido"),
        name: z.string().min(3).optional(),
        password: z.string().min(6, "La contraseña debe tener al menos seis caracteres"),
        code: z.string().max(6),
        remember_me: z.boolean().transform((val) => (val ? 1 : 0)),
    });

    // const schema5 = z.object({
    //     password: z.string().min(6, "La contraseña debe tener al menos seis caracteres"),
    // });

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
        resolver: zodResolver(state === 1 || state === 2 ? schema : state === 3 ? schema2 : state === 4 ? schemaCode : null),
        // resolver: zodResolver(schema),
    });

    const searchParams = useSearchParams();

    const token = searchParams.get("login");

    useEffect(() => {
        if (token == "success") {
            useGetUserInformation();
            toast.success("Sesion iniciada");
            router.push("/usuario");
        }
    }, [token]);

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
        toast.success("Sesion iniciada");
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
        toast.success("Sesion iniciada");
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

    const handleClickAuthWithGoogle = () => {
        window.location.href = "http://localhost:3001/api/auth/google";
    };

    const handleSubmitForm = (data) => {
        console.log(state);
        console.log(data);

        if (state == 1) handleClickSignUp();
        else if (state == 2) handleClickLogIn();
        else if (state == 3) registerUser();
        else if (state == 4) validateEmailCode();

        // state == 1 ? handleClickSignUp

        // onClick={
        //             state == 1 ? handleClickSignUp : state == 2 ? handleClickLogIn : state == 3 ? registerUser : state == 4 ? validateEmailCode : null
        //         }
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <form className="p-4 bg-red-500-" onSubmit={handleSubmit(handleSubmitForm)}>
            <Toaster richColors />
            <Icon icon="mynaui:arrow-left" className="absolute_top-0_left-0_m-8 text-3xl" onClick={() => router.push("/")} />
            <Spacer space={36} />
            <p className="text-3xl font-bold w-3/4">
                {state == 1
                    ? "Crea tu cuenta"
                    : state == 2
                    ? "Inicia sesion"
                    : state == 3
                    ? "Inserta tu nombre de usuario"
                    : state == 4
                    ? "Evirifa tu email"
                    : ""}
            </p>
            {(state == 1 || state == 2) && (
                <>
                    <Spacer space={36} />
                    <div className="flex flex-col gap-4">
                        {/* <div className={`bg-gray-200 w-full rounded-2xl flex items-center p-4 ${errors.email && "border border-red-500"}`}>
                            <div className="grid place-content-center w-1/6">
                                <Icon icon="majesticons:mail" className={`${!errors.email ? "text-gray-500" : "text-red-500"} text-2xl`} />
                            </div>
                            <input
                                {...register("email")}
                                // errors={errors}
                                name="email"
                                type="email"
                                className="w-5/6 appearance-none border-none bg-transparent outline-none"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm ml-4">{errors.email.message}</p>} */}
                        <LoginInput register={register} errors={errors} type="email" name="email" placeholder="" icon="majesticons:mail" />

                        {/* <div className="bg-gray-200 w-full rounded-2xl flex items-center p-4">
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
                        </div> */}
                        <LoginInput register={register} errors={errors} type="password" name="password" placeholder="" icon="mdi:password" />
                    </div>
                </>
            )}
            {state == 3 && (
                <>
                    <Spacer space={36} />
                    {/* <div className="bg-gray-200 w-full rounded-2xl flex items-center p-4">
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
                    </div> */}
                    <LoginInput
                        register={register}
                        errors={errors}
                        type="text"
                        name="name"
                        placeholder="Ingrese su nombre de usuario"
                        icon="lets-icons:user-fill"
                    />
                </>
            )}
            {state == 4 && (
                <>
                    <Spacer space={36} />
                    {/* <div className="bg-gray-200 w-full rounded-2xl flex items-center p-4">
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
                    </div> */}
                    <LoginInput
                        register={register}
                        errors={errors}
                        type="text"
                        name="code"
                        placeholder="Ingresa tu código de verificación"
                        icon="tabler:password"
                    />
                </>
            )}
            <Spacer space={36} />
            <div className="flex justify-center items-center gap-2">
                <input type="checkbox" className="size-4" {...register("remember_me")} />
                <p className="text-xs font-bold">Recordarme</p>
            </div>
            <Spacer space={36} />
            <button
                className="bg-black text-white p-4 rounded-full w-full"
                // type="button"
                // onClick={
                //     state == 1 ? handleClickSignUp : state == 2 ? handleClickLogIn : state == 3 ? registerUser : state == 4 ? validateEmailCode : null
                // }
            >
                {state == 1 || state == 3 ? "Registrarse" : state == 2 ? "Iniciar sesion" : state == 4 ? "Verificar" : "Iniciar Sesion"}
            </button>
            <Spacer space={36} />
            <div className="flex gap-2 items-center text-gray-500">
                <hr className="flex-1 border-gray-300" />
                <p className="flex-1 text-center text-xs">o seguir con </p>
                <hr className="flex-1 border-gray-300" />
            </div>
            <Spacer space={36} />
            <div className="flex justify-around">
                <div className="grid place-content-center border border-gray-300 rounded-xl h-16 w-24" onClick={handleClickAuthWithGoogle}>
                    <Icon icon="material-icon-theme:google" className="text-2xl" />
                </div>
                <div className="grid place-content-center border border-gray-300 rounded-xl h-16 w-24">
                    <Icon icon="logos:facebook" className="text-2xl" />
                </div>
                {/* <div className="grid place-content-center border border-gray-300 rounded-xl h-16 w-24">
                    <Icon icon="material-icon-theme:google" className="text-2xl" />
                </div> */}
            </div>
            <Spacer space={36} />
            {state == 1 ? (
                <p className="text-center text-gray-500">
                    Ya tienes una cuenta?{" "}
                    <span className="text-black cursor-pointer" onClick={() => setState(2)}>
                        Crear cuenta
                    </span>
                </p>
            ) : state == 2 ? (
                <p className="text-center text-gray-500">
                    No tienes una cuenta?{" "}
                    <span className="text-black cursor-pointer" onClick={() => setState(1)}>
                        Iniciar sesion
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

export default Client;
