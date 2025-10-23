import { create } from "zustand";

// tipos de categoris
// 1 = categoria directa => relacion directa entre articulos por ejemplo todos los telefonos.
// 2 = categoria indirecta => relacion indirecta entre los articulos, por ejemplo un telefono y un zapato para mama.
// 3 = categoria general => para poner un articulo en varias categirias generales, es util para poner un mismo telefono en varias categirias, puede ser para una categoria para mama y en otra para mama
// 4 = departamento => los departamentos seran para categorias directas.

const appSettings = create((set) => ({
    appName: "Amazon",
    promotions: [
        {
            id: "1234567",
            image: "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
            link: "/1",
        },
        {
            id: "12345",
            image: "https://th.bing.com/th/id/R.bcd7775fc95dad4db15ea6702fa23775?rik=vMrdvOg6%2b%2fv7mQ&pid=ImgRaw&r=0",
            link: "/2",
        },
        {
            id: "12",
            image: "https://th.bing.com/th/id/R.bcd7775fc95dad4db15ea6702fa23775?rik=vMrdvOg6%2b%2fv7mQ&pid=ImgRaw&r=0",
            link: "/2",
        },
    ],
    promotionOnView: {
        id: "1234567",
        image: "https://i0.wp.com/www.paradavisual.com/wp-content/uploads/2020/08/Huawei-p40-pro-plus-samsung-galaxy-s20-ultra-iphone-11-pro-max.jpg?fit=1920%2C1080&ssl=1",
        link: "/",
    },
    setPromotionOnView: (promotion) => set(() => ({ promotionOnView: promotion })),
    currencies: [
        {
            id: 1,
            name: "DOP",
            value: 1,
            operation: "multiply",
        },
        {
            id: 2,
            name: "USD",
            value: 62.87,
            operation: "divide",
        },
    ],
    seekerPhrase: "",
    setseekerPhrase: (phrase) => set(() => ({seekerPhrase: phrase.target.value})),
}));

export default appSettings;
