import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

// Create a Context
export const StoreContext = createContext();

// Create a Provider Component
const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');
  const [food_list, setFoodList] = useState([]);
  const url = 'http://localhost:4000';

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[itemId] > 1) {
        newCartItems[itemId] -= 1;
      } else {
        delete newCartItems[itemId];
      }
      return newCartItems;
    });

    if (token) {
      try {
        await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log('Fetched food list:', response.data.data);
      setFoodList(response.data.data);
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(`${url}/api/food/get`, {}, { headers: { token } });
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchFoodList();
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (token) {
      loadCartData(token);
    }
  }, [token]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    fetchFoodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
