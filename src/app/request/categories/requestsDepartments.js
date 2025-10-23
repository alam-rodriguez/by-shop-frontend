// import api from "@/app/api/api";
import api from "@/app/api/api.js";
import axios from "axios";

export const getDepartmentsForApp = async () => {
    try {
        const response = await api.get(`/api/categories/departments-for-app`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const getDepartmentById = async (id) => {
    try {
        const response = await api.get(`/api/categories/departments/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error al crear el departamento.");
    }
};

export const updateDepartment = async (department) => {
    try {
        const response = await api.put(`/api/categories/departments/${department.id}`, department);
        return { status: response.status, data: response.data.data, message: response.data.message };
    } catch (error) {
        console.log(error);
        throw new Error("Error al actualizar el departamento.");
    }
};
