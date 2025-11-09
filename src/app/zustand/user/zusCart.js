import { create } from "zustand";

export const zusCart = create((set) => ({
    totalSelectedArticles: 0,
    totalSelectedPrice: 0,
    setTotalSelectedArticles: (articles) =>
        set((state) => {
            // if (!state.currencySelected) return;
            let count = 0;
            let price = 0;
            console.log();
            articles.forEach((article) => {
                if (article.status == 1) {
                    count += article.quantity;
                    price += (article.price + article.price_options) * article.quantity;
                }
            });
            return { totalSelectedArticles: articles.length, totalSelectedPrice: price };
        }),
    currencySelected: null,
    setCurrencySelected: (currency) => set(() => ({ currencySelected: currency })),
    payMethodSelected: {
        id: 1,
        name: "Efectivo",
        description: "El LLegar a la tiendas debes de pagar en efectivo",
        require_image: false,
    },
    setPayMethodSelected: (method) => set(() => ({ payMethodSelected: method })),
    shopSelectedForAddress: null,
    setShopSelectedForAddress: (shop) => set(() => ({ shopSelectedForAddress: shop })),
    userAddressSelected: null,
    setUserAddressSelected: (address) => set(() => ({ userAddressSelected: address })),
    deliveryPreferenceSelected: null,
    setDeliveryPreferenceSelected: (preference) => set(() => ({ deliveryPreferenceSelected: preference })),
    showCurrencies: false,
    setShowCurrencies: (show) => set((state) => ({ showCurrencies: typeof show === "boolean" ? show : !state.showCurrencies })),
    currencySelected: null,
    setCurrencySelected: (currency) => set(() => ({ currencySelected: { ...currency } })),
    price: 0,
    discount: 0,
    paypalFee: 0,
    deliveryPrice: 0,
    totalPrice: 0,
    setPrice: (price) => set(() => ({ price })),
    setDiscount: (discount) => set(() => ({ discount })),
    setPaypalFee: (paypalFee) => set(() => ({ paypalFee })),
    setDeliveryPrice: (deliveryPrice) => set(() => ({ deliveryPrice })),
    setTotalPrice: (totalPrice) => set(() => ({ totalPrice })),
    quantity: 0,
    setQuantity: (quantity) => set(() => quantity),
}));
