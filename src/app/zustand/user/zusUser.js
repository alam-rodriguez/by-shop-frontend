import { create } from "zustand";

// type 0: new user
// type 1: client
// type 2: seller or admin
// type 3: sub admin
// type 4: support
// type 5: dev

// canBuy 0: No puede comprar porque no esta registrado
// canBuy 1: Esta registrado y puede comprar
// canBuy 2: No puede comprar aunque esta registrado porque ha sido sancionado por alguna razon
// canBuy 3: No puede comprar porque es un vendedor

export const zusUser = create((set) => ({
    id: "",
    firstName: "",
    lastName: "",
    registrationDate: "",
    type: 0,
    canBuy: 0,
    email: "",
    emailVerified: false,
    password: "",
    direction: {},
    address: {},

    // want_use_address: null,
    wantUseAddress: null,
    setUserInfo: (user) =>
        set({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            registrationDate: user.created_at,
            type: user.type,
            canBuy: user.can_buy,
            email: user.email,
            emailVerified: user.email_verified,
            password: user.password,
            direction: user.address,
            address: user.address,
            wantUseAddress: user.want_use_address == null ? null : user.want_use_address == 1 ? true : false,
        }),

    id_shop: "",
    name_shop: "",
    setUserShop: (shop) => set({ id_shop: shop.id_shop, name_shop: shop.name_shop }),
}));
