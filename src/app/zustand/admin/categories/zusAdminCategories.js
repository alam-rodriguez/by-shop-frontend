import { create } from "zustand";

export const zusAdminCategories = create((set) => ({
    // 0 = es buscando
    // 1 = encontrados sin probllemas
    // 2 = buscados pero no encontados
    usingCategory: 0,
    setUsingCategory: (category) => set(() => ({ usingCategory: category })),
    directCategories: [],
    directCategoriesStatus: 0,
    setDirectCategories: (categories, status) => set(() => ({ directCategories: categories, directCategoriesStatus: status })),
    categorySelected: {},
    setCategorySelected: (category) => set(() => ({ categorySelected: category })),

    indirectCategories: [],
    indirectCategoriesStatus: 0,
    setIndirectCategories: (categories, status) => set(() => ({ indirectCategories: categories, indirectCategoriesStatus: status })),

    generalCategories: [],
    generalCategoriesStatus: 0,
    setGeneralCategories: (categories, status) => set(() => ({ generalCategories: categories, generalCategoriesStatus: status })),

    generalCategoriesGroups: [],
    generalCategoriesGroupsStatus: 0,
    setGeneralCategoriesGroups: (generalCategoriesGroups, status) =>
        set(() => ({ generalCategoriesGroups: generalCategoriesGroups, groupsGeneralCategoriesStatus: status })),
    generalCategoryGroupSelected: {},
    setGeneralCategoryGroupSelected: (generalCategoryGroup) => set(() => ({ generalCategoryGroupSelected: generalCategoryGroup })),
}));
