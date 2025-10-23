import { create } from "zustand";

export const zusAdminPaymentMethods = create((set) => ({
    paymentMethods: [],
    // 0 = es buscando
    // 1 = encontrados sin probllemas
    // 2 = buscados pero no encontados
    paymentMethodsStatus: 0,
    setPaymentMethods: (paymentMethods, status) => set(() => ({ paymentMethods: paymentMethods, paymentMethodsStatus: status })),
    paymentMethodSelected: {},
    setPaymentMethodSelected: (paymentMethod) => set(() => ({ paymentMethodSelected: paymentMethod })),
}));
