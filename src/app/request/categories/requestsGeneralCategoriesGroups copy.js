const url = process.env.BACKEND_BASE_URL;
// const url = "http://192.168.16.63:8081";

export const getGeneralCategoriesGroups = async () => {
    const res = await fetch(`${url}/categories/general-categories-groups`);
    const data = await res.json();
    return { res, data };
};

export const createGeneralCategoriesGroup = async (generalCategoryGroup) => {
    const res = await fetch(`${url}/categories/general-categories-groups`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(generalCategoryGroup),
    });
    const data = await res.json();
    return { res, data };
};

export const updateGeneralCategoriesGroup = async (generalCategoryGroup) => {
    const res = await fetch(`${url}/categories/general-categories-groups/${generalCategoryGroup.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(generalCategoryGroup),
    });
    const data = await res.json();
    return { res, data };
};

export const createGeneralCategoryGroupCategory = async (category) => {
    const res = await fetch(`${url}/categories/general-categories-groups-categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
    const data = await res.json();
    return { res, data };
};

export const updateGeneralCategoryGroupCategory = async (category) => {
    const res = await fetch(`${url}/categories/general-categories-groups-categories/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
    const data = await res.json();
    return { res, data };
};

export const getGeneralCategoriesGroupsForApp = async () => {
    const res = await fetch(`${url}/categories/general-categories-groups-for-app`);
    const data = await res.json();
    return { res, data };
};
