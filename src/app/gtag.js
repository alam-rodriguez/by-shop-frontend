export const GA_ID = "G-PS1FL2THQF";

export const pageview = (url) => {
    window.gtag("config", GA_ID, {
        page_path: url,
    });
};
