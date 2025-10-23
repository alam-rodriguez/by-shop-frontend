import React from "react";

// Icons
import { Icon } from "@iconify/react";

// Components
import Divider from "@/app/components/home/Divider";
import { useRouter } from "next/navigation";

const UnregisteredUser = () => {
    const router = useRouter();

    const handleClickLogIn = () => router.push("/usuario/sesion");

    return (
        <div>
            <div className="m-4">
                <p>Hola</p>
                <div>
                    <p className="text-3xl text-center my-4 mx-6">Inicia sesion para obtener la mejor experiencia</p>
                    <br />
                    <div className="flex flex-col gap-5">
                        <button className="bg-yellow-400 border border-black p-3 text-xl" onClick={handleClickLogIn}>
                            Iniciar sesion
                        </button>
                        <button className="bg-gray-300 border border-black p-3 text-xl" onClick={handleClickLogIn}>
                            Crear cuenta
                        </button>
                    </div>

                    <div className="flex flex-col gap-10 my-10">
                        <CanDo icon="fxemoji:package" text="Compra, cambio o devuelve articulos y gana puntos" />
                        <CanDo icon="noto:shopping-bags" text="Repite compras anteriores y compra productos esenciales cotidianos" />
                        <CanDo icon="emojione-v1:shopping-bags" text="Crea listas con articulos que quieras, ahora o mas tarde" />
                        {/* <CanDo icon="solar:box-bold-duotone" text="Comprueba el estado del pedido y rastrea, cambia o devuelve articulos" /> */}
                    </div>
                </div>
            </div>
            <Divider h={5} />
            {/* <div className="m-4">
                <p className="text-2xl font-bold tracking-tighter">Consejos utiles</p>
                <div className="mt-5">
                    <HelpUtility text="Bienvenido a amazon" icon="uiw:right" />
                    <HelpUtility text="Como funciona el envio gratuito" icon="uiw:right" />
                    <HelpUtility text="Devoluciones y reembolsos" icon="uiw:right" wantBorder={false} />
                </div>
            </div> */}
            {/* <Divider mt={0} mb={0} h={16} /> */}
        </div>
    );
};

export default UnregisteredUser;

const CanDo = ({ icon, text }) => {
    return (
        <div className="flex items-center">
            <Icon className="w-1/4 text-7xl" icon={icon} />
            <div className="w-3/4 font-bold tracking-tighter">
                <p className="text-lg">{text}</p>
            </div>
        </div>
    );
};

const HelpUtility = ({ text, icon, wantBorder = true }) => {
    return (
        <div className={`flex justify-between items-center ${wantBorder ? "border-b border-gray-600" : ""} py-2`}>
            <p className="text-2xl- text-xl font-medium -font-semibold tracking-tighter-">{text}</p>
            <div className="flex justify-end">
                <Icon className="w-1/4 text-gray-600" icon={icon} height="50" width="90" />
            </div>
        </div>
    );
};
