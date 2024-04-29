import React, { useEffect } from "react";
import useCategoryStore from "../store/categoryStore";
import useForm from "../hooks/useForm";

const CategoryForm = ({ selectedCategoryId }) => {
    const {
        createCategory,
        fetchCategories,
        fetchCategoryById,
        updateCategory,
    } = useCategoryStore();
    const { formData, setFormData, handleChange } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            if (selectedCategoryId) {
                try {
                    const categoryData = await fetchCategoryById(selectedCategoryId);
                    setFormData(categoryData);
                } catch (error) {
                    console.error("Error fetching category by id:", error);
                }
            }
        };

        fetchData();
    }, [selectedCategoryId, setFormData, fetchCategoryById]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedCategoryId) {
            await updateCategory(formData);
            await fetchCategories();
        } else {
            await createCategory(formData);
            await fetchCategories();
        }
    };

    return (
        <div>
            <h2>{selectedCategoryId ? "Edit Category" : "Create Category"}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        required={!selectedCategoryId}
                    />
                </div>
                <button type="submit">
                    {selectedCategoryId ? "Update Category" : "Create Category"}
                </button>
            </form>
        </div>
    );
};

export default CategoryForm;
