import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const API_URL = process.env.REACT_APP_API_URL || 'https://api.daniyaalperfumery.in/api/';

    const fetchUserOrders = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}order/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setOrders(data || []);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (orderData) => {
        if (!token) return { success: false, message: "Please login to place order" };
        try {
            const response = await fetch(`${API_URL}order/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            return { success: false, message: "Network error" };
        }
    };

    const verifyOrderPayment = async (paymentData) => {
        try {
            const response = await fetch(`${API_URL}payment/verify/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(paymentData),
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            return { success: false, message: "Network error" };
        }
    };

    const cancelOrder = async (orderId) => {
        try {
            const response = await fetch(`${API_URL}order/cancel/${orderId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setOrders((prev) => prev.filter((o) => o.id !== orderId));
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    };

    const processCOD = async (orderId) => {
        try {
            const response = await fetch(`${API_URL}payment/cod`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ orderId, order_id: orderId }),
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            return { success: false };
        }
    }

    const createRazorpayOrder = async (amount) => {
        try {
            const response = await fetch(`${API_URL}payment/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ amount }),
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            return { success: false };
        }
    }

    useEffect(() => {
        if (token) fetchUserOrders();
    }, [token]);

    return (
        <OrderContext.Provider
            value={{
                orders,
                loading,
                fetchUserOrders,
                createOrder,
                verifyOrderPayment,
                cancelOrder,
                processCOD,
                createRazorpayOrder
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);
