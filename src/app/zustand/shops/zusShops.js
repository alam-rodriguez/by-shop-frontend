import { create } from "zustand";

export const zusShops = create((set) => ({
    showMenu: null,
    setShowMenu: () =>
        set((state) => {
            // console.log(!state.showMenu);
            return { showMenu: !state.showMenu };
        }),
    showSecondMenu: null,
    setShowSecondMenu: () =>
        set((state) => {
            // console.log(!state.showSecondMenu);
            return { showSecondMenu: !state.showSecondMenu };
        }),
}));
