// Axios
import api from "@/app/api/api";

export const createOrderPaypal = async (purchase_units) => {
    const res = await api.post(`/payments/paypal/create-order`, {
        return_url: window.location.href,
        cancel_url: window.location.href,
        purchase_units,
    });

    // const resg = await fetch("http://localhost:3001/api/payments/paypal/create-order", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //         return_url: window.location.href,
    //         cancel_url: `${window.location.origin}/carrito/comprar`,
    //     }),
    // });
    // const data = await res.json();
    return { status: res.data.status, link: res.data.links[1].href, statusCode: res.status };

    // if (res.status == "CREATED") {
    //     const link = res.data.links[1].href;
    //     console.log(link);
    //     window.location.href = link;
    // }
    // Redirige al usuario a PayPal para aprobar el pago
    // window.location.href = data.approvalUrl;
};
