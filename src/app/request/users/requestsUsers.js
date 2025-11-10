// Axios
import api from "@/app/api/api";

export const userExist = async (email) => {
    try {
        const res = await api.get(`/auth/user-exists/${email}`);
        return res.data.exist;
        // return { data: res.data.data, status: res.status, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const userEmailIsVerified = async (email) => {
    try {
        const res = await api.get(`/auth/user-email-verified/${email}`);
        return res.data.isVerified;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const registerUser = async (data) => {
    try {
        const res = await api.post(`/auth/register`, data);
        console.log(res);
        return { status: res.status, data: res.data.data, message: res.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const loginUser = async (data) => {
    try {
        const res = await api.post(`/auth/login`, data);
        console.log(res.status);
        return { status: res.status, data: res.data.data, message: res.data.message, passwordIsValid: res.data.passwordIsValid };
    } catch (error) {
        const status = error.response?.status;

        if (status === 401) {
            return {
                status,
                passwordIsValid: error.response.data?.passwordIsValid,
                message: error.response.data?.message,
            };
        }

        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getCodeValidation = async (email) => {
    console.log(email);
    try {
        const res = await api.get(`/auth/code-verification/${email}`);
        console.log(res);
        return res.data.code;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const createCodeVerificationEmail = async (email) => {
    try {
        const res = await api.post(`/auth/generate-code-email/${email}`);
        return res.data.codeWasGenerated;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getUserInformation = async () => {
    try {
        const res = await api.get(`/auth/get-user-info`);
        return { status: res.status, data: res.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getUserCurrencyOrMainCurrency = async () => {
    try {
        const res = await api.get(`/users/get-user-currency-or-main-currency`);
        return { status: res.status, data: res.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const refreshToken = async () => {
    try {
        const res = await api.post(`/auth/refresh-token`);
        return res.data.message;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const logout = async () => {
    try {
        const res = await api.post(`/auth/logout`);
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const createAddress = async (address) => {
    try {
        const res = await api.post(`/users/addresses`, address);
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const changeUserWantUseAddress = async (id, wantUseAddress) => {
    try {
        const res = await api.put(`/users/change-want-use-address/${id}`, { want_use_address: wantUseAddress });
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const changeUserEmailVerified = async (email, emailVerified) => {
    try {
        const res = await api.put(`/users/change-email-verified/${email}`, { email_verified: emailVerified });
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getUsers = async () => {
    try {
        const res = await api.get(`/users/`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const getUserById = async (id) => {
    try {
        const res = await api.get(`/users/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const changeUserCanBuy = async (id, canBuy) => {
    try {
        const res = await api.patch(`/users/change-can-buy/${id}`, { can_buy: canBuy });
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error al obtener las categorías.");
    }
};

export const setShopAdmin = async (shopAdmin) => {
    try {
        const res = await api.post(`/users/set-shop-admin`, shopAdmin);
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        if (error.status == 400) return { message: error.response.data.message, status: error.status };
        throw new Error("Error.");
    }
};

export const setShopSubAdmin = async (shopSubAdmin) => {
    try {
        const res = await api.post(`/users/set-shop-sub-admin`, shopSubAdmin);
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        if (error.status == 400) return { message: error.response.data.message, status: error.status };
        throw new Error("Error.");
    }
};

export const changeUserType = async (id, type) => {
    try {
        const res = await api.patch(`/users/change-type/${id}`, { type });
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const getUserShopData = async (email_user) => {
    try {
        const res = await api.get(`/users/shop-data/${email_user}`);
        return { message: res.data.message, status: res.status, data: res.data.data };
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const changeIdShopForCart = async (id_user, id_shop) => {
    try {
        const res = await api.patch(`/users/change-id-shop-for-cart/${id_user}/${id_shop}`);
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const changeIdPayMethodForCart = async (id_user, id_pay_method) => {
    try {
        const res = await api.patch(`/users/change-id-pay-method-for-cart/${id_user}/${id_pay_method}`);
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const changeIdUserAdressForCart = async (id_user, id_address) => {
    try {
        const res = await api.patch(`/users/change-id-user-address-for-cart/${id_user}/${id_address}`);
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const changeIdCurrencyUser = async (idUser, idCurrency) => {
    try {
        const res = await api.patch(`/users/change-id-currency-user/${idUser}`, { id_currency: idCurrency });
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};

export const changeUserTypeId = async (idUser, userTypeId) => {
    try {
        const res = await api.patch(`/users/change-user-type-id/${idUser}`, { user_type_id: userTypeId });
        return { message: res.data.message, status: res.status };
    } catch (error) {
        console.log(error);
        throw new Error("Error.");
    }
};
