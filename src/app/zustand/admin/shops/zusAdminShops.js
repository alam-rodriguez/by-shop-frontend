import { create } from "zustand";

export const zusAdminShops = create((set) => ({
    shops: [],
    // 0 = es buscando
    // 1 = encontrados sin probllemas
    // 2 = buscados pero no encontados
    shopsStatus: 0,
    setShops: (shops, status) => set(() => ({ shops: shops, shopsStatus: status })),
    shopSelected: {},
    setShopSelected: (shop) => set(() => ({ shopSelected: shop })),
}));
