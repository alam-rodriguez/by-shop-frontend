// uuid
import { v4 as uuidv4 } from "uuid";

// Requests
import {
    changeIdCurrencyUser,
    changeIdPayMethodForCart,
    changeIdShopForCart,
    changeIdUserAdressForCart,
    changeUserCanBuy,
    changeUserEmailVerified,
    changeUserType,
    changeUserTypeId,
    changeUserWantUseAddress,
    createAddress,
    createCodeVerificationEmail,
    fetchGetUserByEmail,
    fetchGetUsersShop,
    getCodeValidation,
    getUserById,
    getUserCurrencyOrMainCurrency,
    getUserInformation,
    getUsers,
    getUserShopData,
    loginUser,
    logout,
    refreshToken,
    registerUser,
    setShopAdmin,
    setShopSubAdmin,
    setUserShop,
    userEmailIsVerified,
    userExist,
} from "@/app/request/users/requestsUsers";

// Zustans
import { zusUser } from "@/app/zustand/user/zusUser";
import { useQuery } from "@tanstack/react-query";
import useSetServiceWorker from "../../app/useSetServiceWorker";
import { isUUID } from "../../app/app";

export const useUserExist = async (email) => {
    return await userExist(email);
};

export const useUserEmailIsVerified = async (email) => {
    return await userEmailIsVerified(email);
};

export const useRegisterUser = async (data) => {
    const arrayName = data.name.split(" ");
    let firstNames = "";
    let lastNames = "";
    if (arrayName.length <= 2) {
        firstNames = arrayName[0];
        lastNames = arrayName[1] ? arrayName[1] : "";
    } else {
        firstNames = arrayName[0] + " " + arrayName[1];
        lastNames = (arrayName[2] ? arrayName[2] : "") + " " + (arrayName[3] ? arrayName[3] : "");
    }
    const userObj = {
        id: uuidv4(),
        email: data.email,
        password: data.password,
        first_name: firstNames,
        last_name: lastNames,
        type: 1,
        can_buy: 1,
        direction: {},
    };

    const { status, data: resData, message } = await registerUser(userObj);

    return status;
};

export const useLoginUser = async (email, password) => {
    const userObj = {
        email,
        password,
    };

    const { status, data: resData, message, passwordIsValid } = await loginUser(userObj);

    return { status, data: resData, message, passwordIsValid, message };
};

// export const useGetCodeValidation = (email) =>
//     useQuery({
//         queryKey: [`code-validation-${email}`],
//         queryFn: () => getCodeValidation(email),
//     });

export const useGetCodeValidation = async (email) => {
    console.log(email);
    return await getCodeValidation(email);
};

export const useCreateCodeVerificationEmail = async (email) => {
    const codeWasGenerated = await createCodeVerificationEmail(email);
    return codeWasGenerated;
};

export const useRequestsUsers = () => {
    const { setUserInfo, setCurrencySelected, setTrueWasSearched } = zusUser();
    const { setServiceWorker } = useSetServiceWorker();

    const useGetUserInformation = async () => {
        const { status, data } = await getUserInformation();
        console.log(data);
        console.log(status);
        if (status == 200) {
            setUserInfo(data);
            setServiceWorker();
        } else
            setUserInfo({
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
                want_use_address: false,
                shop_id: null,
                id_shop: null,
            });
        setTrueWasSearched();
    };

    const useGetUserCurrencyOrMainCurrency = async () => {
        const { status, data } = await getUserCurrencyOrMainCurrency();
        console.log(data);
        if (status == 200) setCurrencySelected(data);
    };

    return { useGetUserInformation, useGetUserCurrencyOrMainCurrency };
};

export const useRefreshToken = async () => {
    const res = await refreshToken();
    console.log(res);
    return res;
};

export const useLogout = async () => {
    const res = await logout();
    console.log(res);
    return res;
};

export const useCreateAddress = async (address) => {
    const { message, status } = await createAddress({ ...address, preferred_address: address.preferred_address ? 1 : 0 });
    if (status == 201) return true;
    return false;
};

export const useChangeUserWantUseAddress = async (id, wantUseAddress) => {
    const { message, status } = await changeUserWantUseAddress(id, wantUseAddress);
    if (status == 200) return true;
    return false;
};

export const useChangeUserEmailVerified = async (email, emailVerified) => {
    const { message, status } = await changeUserEmailVerified(email, emailVerified);
    if (status == 200) return true;
    return false;
};

export const useGetUsers = () =>
    useQuery({
        queryKey: [`users`],
        staleTime: Infinity,
        queryFn: () => getUsers(),
    });

export const useGetUserById = (id) =>
    useQuery({
        queryKey: [`user-${id}-data`],
        queryFn: () => getUserById(id),
    });

export const useChangeUserCanBuy = async (id, canBuy) => {
    const { message, status } = await changeUserCanBuy(id, canBuy);
    if (status == 200) return true;
    return false;
};

export const useSetUserShop = async (id, shopId) => {
    const { message, status } = await setUserShop(id, shopId);
    return status == 200;
};

export const useSetShopAdmin = async (idUser, email_user, id_shop) => {
    const adminShopObj = {
        id: uuidv4(),
        id_user: idUser,
        email_user: email_user,
        id_shop: id_shop,
        type: 1,
        status: 1,
    };
    const { message, status } = await setShopAdmin(adminShopObj);
    return { message, status };
};

export const useSetShopSubAdmin = async (email_user, id_shop) => {
    const subAdminShopObj = {
        id: uuidv4(),
        email_user: email_user,
        id_shop: id_shop,
        type: 2,
        status: 1,
    };
    const { message, status } = await setShopSubAdmin(subAdminShopObj);
    return { message, status };
};

export const useChangeUserType = async (idUser, type) => {
    const { message, status } = await changeUserType(idUser, type);
    return status == 200 ? true : false;
};

export const useResquestsUsers = () => {
    const { setUserShop } = zusUser();

    const useGetUserShopData = async (email_user) => {
        console.log(email_user);
        const { message, status, data } = await getUserShopData(email_user);
        if (status == 200) setUserShop(data);
    };

    return { useGetUserShopData };
};

export const useChangeIdShopForCart = async (id_user, id_shop) => {
    const { message, status } = await changeIdShopForCart(id_user, id_shop);
    return status == 200 ? true : false;
};

export const useChangeIdPayMethodForCart = async (id_user, id_pay_method) => {
    const { message, status } = await changeIdPayMethodForCart(id_user, id_pay_method);
    return status == 200 ? true : false;
};

export const useChangeIdUserAdressForCart = async (id_user, id_address) => {
    const { message, status } = await changeIdUserAdressForCart(id_user, id_address);
    return status == 200 ? true : false;
};

export const useChangeIdCurrencyUser = async (idUser, idCurrency) => {
    const { message, status } = await changeIdCurrencyUser(idUser, idCurrency);
    return status == 200 ? true : false;
};

export const useChangeUserTypeId = async (idUser, userTypeId) => {
    const { message, status } = await changeUserTypeId(idUser, userTypeId);
    return status == 200;
};

export const getUsersShop = (shopId) =>
    useQuery({
        queryKey: [`users-shops-${shopId}`],
        enabled: isUUID(shopId),
        queryFn: () => fetchGetUsersShop(shopId),
    });

export const getUserByEmail = async (email) => {
    const { data } = await fetchGetUserByEmail(email);
    return data;
};
