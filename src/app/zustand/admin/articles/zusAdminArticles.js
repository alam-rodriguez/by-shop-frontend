import { create } from "zustand";

export const zusAdminArticles = create((set) => ({
    articles: [],
    // 0 = es buscando
    // 1 = encontrados sin probllemas
    // 2 = buscados pero no encontados
    articlesStatus: 0,
    setArticles: (articles, status) => set(() => ({ articles: articles, articlesStatus: status })),
    articleSelected: {},
    setArticleSelected: (article) => set(() => ({ articleSelected: article })),
}));
