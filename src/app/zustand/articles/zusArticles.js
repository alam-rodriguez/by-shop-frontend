import { create } from "zustand";

export const zusArticles = create((set) => ({
    articleSelected: {},
    setArticleSelected: (article) => set({ articleSelected: article }),
    quantity: 1,
    setQuantity: (quantity) =>
        set((state) => {
            if (quantity > 0) return { quantity: quantity };
            return {};
        }),
    optionsSelected: {},
    setOptionsSelected: (option) =>
        set((state) => {
            const optionsSelected = { ...state.optionsSelected };
            let isSameOption = false;
            if (state.optionsSelected[option.id_option] != null && state.optionsSelected[option.id_option].id == option.id) {
                delete optionsSelected[option.id_option];
                isSameOption = true;
            }
            if (isSameOption) return { optionsSelected };
            return { optionsSelected: { ...optionsSelected, [option.id_option]: option } };
        }),
    offer: {},
    setOffer: (offer) => set({ offer: offer }),
    hasOffer: false,
    price: 0,
    setPrice: () =>
        set((state) => {
            console.log(state.articleSelected);
            let newPrice = state.articleSelected.price ? state.articleSelected.price : 0;
            const percent_discount = state.offer.percent_discount ? state.offer.percent_discount : 0;
            Object.values(state.optionsSelected).forEach((optionPrice) => {
                console.log(optionPrice);
                newPrice += optionPrice.price;
            });
            newPrice *= state.quantity;

            const hasOffer = percent_discount > 0;
            if (percent_discount > 0) newPrice = newPrice * (1 - percent_discount / 100);

            return { price: newPrice, hasOffer: hasOffer };
        }),
    resetArticleSeleceted: () => set({ articleSelected: {}, optionsSelected: {}, quantity: 1, price: 0, offer: {}, hasOffer: false }),
    // articleSelected: null,
    colorSelected: {},
    setColorSelected: (color) => set({ colorSelected: color }),
    sizeSelected: {},
    setSizeSelected: (size) => set({ sizeSelected: size }),
    providerSelected: {},
    setProviderSelected: (provider) => set({ providerSelected: provider }),
    conditionSelected: {},
    setConditionSelected: (condition) => set({ conditionSelected: condition }),
    // setArticleSelected: (articleId) =>
    //     set((state) => {
    //         const articleSelected = state.articles.find((article) => article.id == articleId);
    //         return { articleSelected: articleSelected };
    //     }),
    articles: [
        {
            id: "123458867",
            name: "hola",
            description:
                "seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos",
            price: 2999,
            status: 1,
            mainColor: "",
            mainImage:
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            images: [
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            ],
            mainVideo: "",
            Maincategory: "",
            marca: "",
            modelo: "",
            view: 1,
            lista: 1,
            votes: 52,
            totalScore: 208,
            shop: "Boots Mobile",
            hasOffer: true,
            priceWithOffer: 1000,
            price: 2000,
            availableQuantities: 13,
            note: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi voluptas aut numquam? Illo provident autem ipsam sit veritatis facilis nobis! Optio, veniam. Commodi ipsam, quod ea nobis eligendi quisquam velit",
            boxContents: [
                "1 manual de instrucciones (idioma espanol no garantizado).",
                "1 manual de instrucciones (idioma espanol no garantizado).",
                "1 manual de instrucciones (idioma espanol no garantizado).",
                "1 manual de instrucciones (idioma espanol no garantizado).",
                "1 manual de instrucciones (idioma espanol no garantizado).",
                "1 manual de instrucciones (idioma espanol no garantizado).",
            ],
            reviews: [
                {
                    id: "23456",
                    clientName: "Ivonna",
                    clientId: "123456",
                    articleid: "1234567",
                    stars: 4,
                    reviewTitle: "Cheap and good cell phones",
                    reviewContent:
                        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos obcaecati odio laborum recusandae nam debitis voluptas fuga quos inventore aspernatur molestias iste dolorem autem numquam, magnam blanditiis dolore. Suscipit, quis!",
                    reviewDate: "27 de noviembre del 2024",
                    articleColor: 0,
                    utilCount: 0,
                    status: 0,
                },
                {
                    id: "234567",
                    clientName: "Ivonna",
                    clientId: "123456",
                    articleid: "1234567",
                    stars: 4,
                    reviewTitle: "Cheap and good cell phones",
                    reviewContent:
                        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos obcaecati odio laborum recusandae nam debitis voluptas fuga quos inventore aspernatur molestias iste dolorem autem numquam, magnam blanditiis dolore. Suscipit, quis!",
                    reviewDate: "27 de noviembre del 2024",
                    articleColor: 0,
                    utilCount: 0,
                    status: 1,
                },
                {
                    id: "234568",
                    clientName: "Ivonna",
                    clientId: "123456",
                    articleid: "1234567",
                    stars: 4,
                    reviewTitle: "Cheap and good cell phones",
                    reviewContent:
                        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos obcaecati odio laborum recusandae nam debitis voluptas fuga quos inventore aspernatur molestias iste dolorem autem numquam, magnam blanditiis dolore. Suscipit, quis!",
                    reviewDate: "27 de noviembre del 2024",
                    articleColor: "negro",
                    utilCount: 0,
                    status: 2,
                },
            ],
            colors: [
                {
                    id: "123456",
                    name: "Negro-",
                    image: 1,
                    availableQuantity: 8,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                },
                {
                    id: "12345",
                    name: "Negro-",
                    image: 2,
                    availableQuantity: 8,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                },
                {
                    id: "23456",
                    name: "Rojo-",
                    image: 4,
                    availableQuantity: 9,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                },
            ],
            sizes: [
                {
                    id: "2345678",
                    size: 64,
                    availableQuantity: 9,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                    image: 1,
                },
                {
                    id: "2378",
                    size: 128,
                    availableQuantity: 9,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                    image: 2,
                },
                {
                    id: "245678",
                    size: 64,
                    availableQuantity: 9,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                    image: 3,
                },
                {
                    id: "23456",
                    size: 64,
                    availableQuantity: 9,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                    image: 4,
                },
            ],
            providers: [
                {
                    id: "2345678",
                    name: "AT&T",
                    availableQuantity: 9,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                    image: 1,
                },
                {
                    id: "234567",
                    name: "T-Mobile",
                    availableQuantity: 9,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                    image: 2,
                },
                {
                    id: "23456",
                    name: "claro",
                    availableQuantity: 9,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                    image: 3,
                },
            ],
            conditions: [
                {
                    id: "2345678",
                    condition: "Renovado",
                    availableQuantity: 9,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                    image: 1,
                },
                {
                    id: "234567",
                    condition: "Renovado",
                    availableQuantity: 9,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                    image: 2,
                },
                {
                    id: "2345",
                    condition: "Renovado",
                    availableQuantity: 9,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                    image: 5,
                },
            ],
            galeryImages: [
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            ],
        },
        {
            id: "123234567467",
            name: "hola",
            description:
                "seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos",
            price: 2999,
            status: 1,
            mainColor: "",
            mainImage:
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            images: [
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            ],
            mainVideo: "",
            Maincategory: "",
            marca: "",
            modelo: "",
            view: 1,
            lista: 1,
            colors: [
                {
                    id: "123456",
                    color: "Negro-",
                    image: 1,
                    availableQuantity: 8,
                    price: 199,
                    hasOffer: true,
                    priceWithOffer: 174,
                },
            ],
        },
        {
            id: "1243456765467",
            name: "hola",
            description:
                "seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos",
            price: 2999,
            status: 1,
            mainColor: "",
            mainImage:
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            images: [
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            ],
            mainVideo: "",
            Maincategory: "",
            marca: "",
            modelo: "",
            view: 1,
            lista: 1,
        },
        {
            id: "13412345678765567",
            name: "hola",
            description:
                "seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos",
            price: 2999,
            status: 1,
            mainColor: "",
            mainImage:
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            images: [
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            ],
            mainVideo: "",
            Maincategory: "",
            marca: "",
            modelo: "",
            view: 1,
            lista: 1,
            boxContents: [
                "1 manual de instrucciones (idioma espanol no garantizado).",
                "1 manual de instrucciones (idioma espanol no garantizado).",
                "1 manual de instrucciones (idioma espanol no garantizado).",
                "1 manual de instrucciones (idioma espanol no garantizado).",
                "1 manual de instrucciones (idioma espanol no garantizado).",
                "1 manual de instrucciones (idioma espanol no garantizado).",
            ],
        },
        {
            id: "2352345678967",
            name: "hola",
            description:
                "seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos",
            price: 2999,
            status: 1,
            mainColor: "",
            mainImage:
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            images: [
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            ],
            mainVideo: "",
            Maincategory: "",
            marca: "",
            modelo: "",
            view: 1,
            lista: 1,
        },
        {
            id: "12358888867",
            name: "hola",
            description:
                "seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos seguir comprado autos y adutos",
            price: 2999,
            status: 1,
            mainColor: "",
            mainImage:
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            images: [
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
                "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            ],
            mainVideo: "",
            Maincategory: "",
            marca: "",
            modelo: "",
            view: 1,
            lista: 1,
        },
    ],
}));
