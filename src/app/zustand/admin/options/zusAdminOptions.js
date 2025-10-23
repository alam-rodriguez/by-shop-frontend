import { create } from "zustand";

export const zusAdminOptions = create((set) => ({
    options: [],
    // 0 = es buscando
    // 1 = encontrados sin probllemas
    // 2 = buscados pero no encontados
    optionsStatus: 0,
    setOptions: (options, status) => set(() => ({ options: options, optionsStatus: status })),
    optionSelected: {},
    setOptionSelected: (option) => set(() => ({ optionSelected: option })),

    valuesOptions: [],
    valuesOptionsStatus: 0,
    setValuesOptions: (valueOption, status) => set(() => ({ valuesOptions: valueOption, valuesOptionsStatus: status })),
    valueOptionSelected: {},
    setValueOptionSelected: (valueOption) => set(() => ({ valueOptionSelected: valueOption })),
}));
