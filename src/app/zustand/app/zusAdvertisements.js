import { create } from "zustand";

const useCarouselStore = create((set, get) => ({
    currentIndex: 0,
    startCarousel: (length) => {
        if (get()._interval) return; // evitar múltiples intervalos

        const interval = setInterval(() => {
            set((state) => ({
                currentIndex: (state.currentIndex + 1) % length,
            }));
        }, 5000);

        set({ _interval: interval });
    },
    stopCarousel: () => {
        const interval = get()._interval;
        if (interval) clearInterval(interval);
        set({ _interval: null });
    },
}));

export default useCarouselStore;
