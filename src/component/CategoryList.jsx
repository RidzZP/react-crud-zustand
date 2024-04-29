import React, { useEffect, useState } from "react";
import useCategoryStore from "../store/categoryStore";
import CategoryForm from "./CategoryForm";

const CategoryList = () => {
    const {
        categories,
        loading,
        fetchCategories,
        fetchCategoryById,
        deleteCategory,
    } = useCategoryStore();
    const [showForm, setShowForm] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const toggleForm = () => {
        setShowForm(!showForm);
        setSelectedCategoryId(null);
    };

    const handleEdit = async (categoryId) => {
        try {
            const categoryData = await fetchCategoryById(categoryId);
            setSelectedCategoryId(categoryId);
            setShowForm(true);
        } catch (error) {
            console.error("Error fetching category by id:", error);
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            await deleteCategory(categoryId);
            await fetchCategories();
        } catch (error) {
            console.error("Error deleting category by id:", error);
        }
    };

    return (
        <div>
            <h2>Category List</h2>
            <button onClick={toggleForm}>
                {showForm ? "Hide Form" : "Add Category"}
            </button>
            {showForm && <CategoryForm selectedCategoryId={selectedCategoryId} />}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {categories.map((category) => (
                        <li key={category.id}>
                            <p>{category.name}</p>
                            <button onClick={() => handleEdit(category.id)}>Edit</button>
                            <button onClick={() => handleDelete(category.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategoryList;
