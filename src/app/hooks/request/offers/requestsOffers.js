// React Query
import { useQuery } from "@tanstack/react-query";

// UUID
import { v4 as uuidv4 } from "uuid";

// Requests
import { createOffer, createOfferCategory, createOfferArticle, getOffers, getOffer, updateOffer, deleteOfferCategory, deleteOfferArticle } from "@/app/request/offers/requestsOffers";

export const  useGetOffers = () =>
    useQuery({
        queryKey: [`offers`],
        staleTime: Infinity,
        queryFn: () => getOffers(),
    });

export const useGetOffer = (id) =>
    useQuery({
        queryKey: [`offer-${id}`],
        queryFn: () => getOffer(id),
    });



export const useCreateOffer = async (offer) => {
    const offerObj = {
      id: offer.id,
      name: offer.name,
      description: offer.description,
      percent_discount: offer.percent_discount,
      image: offer.image,
      date_start: offer.date_start,
      date_end: offer.date_end,
      status: offer.status,
    };

    const { data, status } = await createOffer(offerObj);
    return { data, status };
};

export const useCreateOfferCategory = async (id_offer, type_category, percent_discount, status, offerCategories) => {

  console.log(offerCategories);

  const promises = offerCategories.map(async (offerCategory) => {
    const offerCategoryObj = {
      id: uuidv4(),
      id_offer: id_offer,
      id_category: offerCategory.value,
      type_category: type_category,
      percent_discount: percent_discount,
      status: status,
    };

    const { data, status: resStatus } = await createOfferCategory(offerCategoryObj);
    return resStatus == 201;
  });

  const results = await Promise.all(promises);
  return results.every(result => result);
    
};

export const useDeleteOfferCategory = async (idOffer, offerCategories) => {
  console.log(offerCategories);

  const promises = offerCategories.map(async (offerCategory) => {
    const { data, status: resStatus } = await deleteOfferCategory(idOffer, offerCategory.id_category);
    console.log(resStatus);
    return resStatus == 200;
  });

  const results = await Promise.all(promises);
  return results.every(result => result);
    
};



export const useCreateOfferArticle = async (id_offer, percent_discount, price, status, offerArticles) => {

  const promises = offerArticles.map(async (offerArticle) => {
    const offerArticleObj = {
      id: uuidv4(),
      id_offer: id_offer,
      id_article: offerArticle.value,
      percent_discount: percent_discount,
      price: price,
      status: status,
    };

    const { data, status: resStatus } = await createOfferArticle(offerArticleObj);
    return resStatus == 201;
  });

  const results = await Promise.all(promises);
  return results.every(result => result);
    
};

export const useUpdateOffer = async (offer) => {
    const offerObj = {
      id: offer.id,
      name: offer.name,
      description: offer.description,
      percent_discount: offer.percent_discount,
      image: offer.image,
      date_start: offer.date_start,
      date_end: offer.date_end,
      status: offer.status,
    };

    const { data, status } = await updateOffer(offerObj);
    return status == 200;
};

export const useDeleteOfferArticle = async (idOffer, offerArticles) => {
  const promises = offerArticles.map(async (offerArticle) => {
    const { data, status: resStatus } = await deleteOfferArticle(idOffer, offerArticle.id_article);
    console.log(resStatus);
    return resStatus == 200;
  });

  const results = await Promise.all(promises);
  return results.every(result => result);
    
};

