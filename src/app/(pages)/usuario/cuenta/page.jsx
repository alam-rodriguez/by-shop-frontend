// React
import React from "react";

// Next
import Link from "next/link";

// Icons
import { Icon } from "@iconify/react";

// Components
import Divider from "@/app/components/home/Divider";
import Spacer from "@/app/components/home/Spacer";

const page = () => {
    return (
        <div className="m-4 flex flex-col gap-8">
            <AccountOptions
                text="Pedidos"
                options={[
                    { option: "Tus Pedidos", Link: "/usuario/pedidos" },
                    { option: "Tu Subscribe & Save", Link: "#" },
                    { option: "Tus alertas de precio", Link: "#" },
                    { option: "Tus Pedidos de alquiler", Link: "#" },
                    { option: "Solicitudes de servicio", Link: "#" },
                    { option: "Tu Amazon Day", Link: "#" },
                    { option: "Retiros y alertas de seguridad del producto", Link: "#" },
                ]}
            />
            <AccountOptions text="Servicio al Cliente" options={[{ option: "Contactanos", Link: "#" }]} />
            <AccountOptions text="Promociones" options={[{ option: "Tus saldos de credito y beneficios", Link: "#" }]} />
            <AccountOptions
                text="Configuración de cuenta"
                options={[
                    { option: "Inicio de sesion y seguridad", Link: "#" },
                    { option: "Crea tu cuenta corporativa gratis", Link: "#" },
                    { option: "Cambiar de cuenta", Link: "#" },
                    { option: "Direcciones", Link: "/usuario/direcciones" },
                    { option: "Administrar las identificaciones registradas", Link: "#" },
                    { option: "Adminstra tu Amazon Familia", Link: "#" },
                    { option: "Configuracion con 1-Click", Link: "#" },
                    { option: "Administrar la membresia de Prime", Link: "#" },
                    { option: "Biblioteca de contenido", Link: "#" },
                    { option: "Dispositivos", Link: "#" },
                    { option: "Administrar entrega digital", Link: "#" },
                    { option: "Programa para adolecentes", Link: "#" },
                    { option: "Configuracion de Audible", Link: "#" },
                    { option: "Configuracion de Amazon Music", Link: "#" },
                    { option: "Membresias y suscripciones", Link: "#" },
                    { option: "Configuracion de Amazon Key", Link: "#" },
                    { option: "Configuracion de Whole Foods Market", Link: "#" },
                ]}
            />
            <AccountOptions
                text="Amazon Wallet"
                options={[
                    { option: "Tus Pagos", Link: "#" },
                    { option: "Administrar salgo de tarjeta de regalo", Link: "#" },
                    { option: "Compra con puntos", Link: "#" },
                    { option: "Saldo de beneficios", Link: "#" },
                    { option: "Tus tarjetas de credito Amazon", Link: "#" },
                    { option: "Pago en cuotas con tarjeta de credito de externos", Link: "#" },
                    { option: "Balance de recompensas sin prisa", Link: "#" },
                    { option: "Wallet promocional en la tienda", Link: "#" },
                    { option: "Vales de productos", Link: "#" },
                ]}
            />
            <AccountOptions
                text="Centro de mensajes"
                options={[
                    { option: "Mensajes", Link: "#" },
                    { option: "Recordatorios de comprar", Link: "#" },
                ]}
            />
            <AccountOptions
                text="Contenido personalizado"
                options={[
                    { option: "Tus preferencias de compra", Link: "#" },
                    { option: "Tu contenido", Link: "#" },
                    { option: "Tus recomendaciones", Link: "#" },
                    { option: "Mis videos de productos subidos", Link: "#" },
                    { option: "Tu Garaje", Link: "#" },
                    { option: "Tu Fanshop", Link: "#" },
                    { option: "Tus intereses", Link: "#" },
                    { option: "Tus Mascotas", Link: "#" },
                    { option: "Tus articulos vistos recientemente", Link: "#" },
                    { option: "Opina sobre tus compras", Link: "#" },
                ]}
            />
            <AccountOptions
                text="Preferencias de la aplicación"
                options={[
                    { option: "Tus opciones de privacidad de los anuncios", Link: "#" },
                    { option: "Administrar imagenes de la camara en la aplicacion de Amazon", Link: "#" },
                ]}
            />
            <AccountOptions
                text="Administrar tus datos"
                options={[
                    { option: "Solicita tus datos", Link: "#" },
                    { option: "Administra las aplicaciones y servicios con acceso a la informacion", Link: "#" },
                    { option: "Cerrar tu cuenta de Amazon", Link: "#" },
                    { option: "Aviso de privacidad", Link: "#" },
                ]}
            />
        </div>
    );
};

const AccountOptions = ({ text, options }) => {
    return (
        <div>
            <p className="text-2xl font-bold">{text}</p>
            <Spacer space={12} />
            <div className="border border-gray-400 rounded-lg">
                {options.map((option, index) => (
                    <Link href={option.Link} key={index}>
                        <div className="flex justify-between items-center m-4">
                            <p>{option.option}</p>
                            <Icon icon="icon-park-outline:right" className="text-3xl" />
                        </div>
                        {index < options.length - 1 && <Divider mt={0} mb={0} />}
                    </Link>
                ))}

                {/* <Divider mt={0} mb={0} />
                <div className="flex justify-between items-center m-4">
                    <p>Tus Pedidos</p>
                    <Icon icon="icon-park-outline:right" className="text-3xl" />
                </div>
                <Divider mt={0} mb={0} />
                <div className="flex justify-between items-center m-4">
                    <p>Tus Pedidos</p>
                    <Icon icon="icon-park-outline:right" className="text-3xl" />
                </div>
                <Divider mt={0} mb={0} />
                <div className="flex justify-between items-center m-4">
                    <p>Tus Pedidos</p>
                    <Icon icon="icon-park-outline:right" className="text-3xl" />
                </div>
                <Divider mt={0} mb={0} />
                <div className="flex justify-between items-center m-4">
                    <p>Tus Pedidos</p>
                    <Icon icon="icon-park-outline:right" className="text-3xl" />
                </div> */}
            </div>
        </div>
    );
};

export default page;
