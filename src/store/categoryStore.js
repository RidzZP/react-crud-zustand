import { create } from "zustand";
import {
    getCategory,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "../services/categoryService";

const useCategoryStore = create((set) => ({
    categories: [],
    loading: true,
    fetchCategories: async () => {
        try {
            const data = await getCategory(1, 5, "");
            set({ categories: data.data.data, loading: false });
        } catch (error) {
            console.error("Error fetching categories:", error);
            set({ loading: false });
        }
    },
    fetchCategoryById: async (categoryId) => {
        try {
            const data = await getCategoryById(categoryId);
            return data;
        } catch (error) {
            console.error("Error fetching category by id:", error);
            throw error;
        }
    },
    createCategory: async (formData) => {
        try {
            await createCategory(formData);
        } catch (error) {
            console.error("Error creating category:", error);
        }
    },
    updateCategory: async (formData) => {
        try {
            await updateCategory(formData);
        } catch (error) {
            console.error("Error updating category:", error);
        }
    },
    deleteCategory: async (categoryId) => {
        try {
            await deleteCategory(categoryId);
        } catch (error) {
            console.error("Error deleting category by id:", error);
            throw error;
        }
    },
}));

export default useCategoryStore;
