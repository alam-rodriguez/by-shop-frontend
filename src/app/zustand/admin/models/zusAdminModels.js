import { create } from "zustand";

export const zusAdminModels = create((set) => ({
    models: [],
    // 0 = es buscando
    // 1 = encontrados sin probllemas
    // 2 = buscados pero no encontados
    modelsStatus: 0,
    setModels: (models, status) => set(() => ({ models: models, modelsStatus: status })),
    modelSelected: {},
    setModelSelected: (model) => set(() => ({ modelSelected: model })),
}));
