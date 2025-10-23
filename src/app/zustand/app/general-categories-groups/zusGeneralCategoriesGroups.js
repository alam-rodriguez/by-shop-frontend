import { create } from "zustand";

export const zusGeneralCategoriesGroups = create((set) => ({
    generalCategoriesGroups: [],
    // 0 = es buscando
    // 1 = encontrados sin probllemas
    // 2 = buscados pero no encontados
    generalCategoriesGroupsStatus: 0,
    setGeneralCategoriesGroups: (generalCategoriesGroups, status) =>
        set(() => ({ generalCategoriesGroups: generalCategoriesGroups, generalCategoriesGroupsStatus: status })),
}));
