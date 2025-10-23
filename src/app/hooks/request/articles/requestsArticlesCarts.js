import { useQuery } from "@tanstack/react-query";
import { getArticlesOrderByIdCart } from "@/app/request/articles/requestsArticlesCarts";

export const useGetArticlesOrderByIdCart = (idCart) =>
    useQuery({
        queryKey: [`articles-order-by-id-cart-${idCart}`],
        queryFn: () => getArticlesOrderByIdCart(idCart),
    });
