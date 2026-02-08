import React, { createContext, useState, useEffect, useContext } from 'react';

const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL || 'https://api.daniyaalperfumery.in/api/';

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}category`);
            if (!response.ok) throw new Error('Failed to fetch categories');
            const data = await response.json();
            setCategories(data);
            setError(null);
            return { success: true, data };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const getCategoryById = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}category/${id}`);
            if (!response.ok) throw new Error('Failed to fetch category');
            const data = await response.json();
            setError(null);
            return { success: true, data };
        } catch (err) {
            setError(err.message);
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{
            categories,
            loading,
            error,
            fetchCategories,
            getCategoryById
        }}>
            {children}
        </CategoryContext.Provider>
    );
};
