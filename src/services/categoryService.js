import axios from "axios";

const BASE_URL = "https://staging-api.jaja.id/";
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE0MTAwODU2LCJleHAiOjE3MTQ3MDU2NTZ9.erFEASC1tz3FSmbojeAafRlpEbmIvGauYEvqyZPtPgw";

export const getCategory = async (page, limit, keyword) => {
    try {
        const response = await axios.get(
            `${BASE_URL}category/get-category?page=${page}&limit=${limit}&keyword=${keyword}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error while fetching categories:", error);
        throw error;
    }
};

export const getCategoryById = async (categoryId) => {
    try {
        const response = await axios.get(
            `${BASE_URL}category/get-category-detail?id=${categoryId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.data;
    } catch (error) {
        console.error("Error while fetching category by id:", error);
        throw error;
    }
};

export const createCategory = async (formData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}category/create-category`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error while creating category:", error);
        throw error;
    }
};

export const updateCategory = async (formData) => {
    try {
        const response = await axios.put(
            `${BASE_URL}category/update-category`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error while updating category:", error);
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`${BASE_URL}category/delete-category`, {
            data: { id: categoryId },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting category by id:", error);
        throw error;
    }
};
