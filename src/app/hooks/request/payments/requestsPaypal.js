// Request
import { createOrderPaypal } from "@/app/request/payments/requestsPaypal";

export const useCreateOrderPaypal = async () => {
    const { status, link, statusCode } = await createOrderPaypal();

    return { status, link, statusCode };
    // if (status == "CREATED") {
    //     window.location.href = link;
    // } else {
    //     throw new Error("Error al crear la orden de PayPal.");
    // }
};

// export const goToPaypal = (link) => {
//   window.location.href = link;
// };
