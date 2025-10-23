import { create } from "zustand";

export const zusAdminBrands = create((set) => ({
    brands: [],
    // 0 = es buscando
    // 1 = encontrados sin probllemas
    // 2 = buscados pero no encontados
    brandsStatus: 0,
    setBrands: (brands, status) => set(() => ({ brands: brands, brandsStatus: status })),
    brandSelected: {},
    setBrandSelected: (shop) => set(() => ({ brandSelected: shop })),
}));
