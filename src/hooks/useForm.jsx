import { useState } from "react";

const useForm = (initialState = {}) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        const newValue = type === "file" ? files[0] : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    return {
        formData,
        setFormData,
        handleChange,
    };
};

export default useForm;
