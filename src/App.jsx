import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Notification from "./components/Notification";
import { showNotification, clearNotification } from "./store/notificationSlice";
import { replaceCart, sendCartData } from "./store/cartSlice";

const App = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.cart.isVisible);
  const items = useSelector((state) => state.cart.items);
  const notification = useSelector((state) => state.notification.notification);
  const isInitial = useRef(true);

  // Fetch cart data on load 
  useEffect(() => {
    const fetchCartData = async () => {
      dispatch(
        showNotification({
          status: "pending",
          title: "Fetching...",
          message: "Loading your cart data...",
        })
      );

      try {
        const response = await fetch(
          "https://crudcrud.com/api/374f5f7d68934e64aa18767ac4e208fa/cart"
        );
        if (!response.ok) throw new Error("Failed to fetch cart data!");

        const data = await response.json();
        dispatch(replaceCart(data[0]?.items || []));

        dispatch(
          showNotification({
            status: "success",
            title: "Success!",
            message: "Fetched cart data successfully!",
          })
        );
      } catch (error) {
        dispatch(
          showNotification({
            status: "error",
            title: "Error!",
            message: "Fetching cart data failed!",
          })
        );
        console.log(error)
      }
    };

    fetchCartData();
  }, [dispatch]);

  // Send cart data using createAsyncThunk ---
  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    if (items.length > 0) {
      dispatch(sendCartData(items));
    }
  }, [items, dispatch]);

  // Auto remove notification after 3s 
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Header />
      <ProductList />
      {isVisible && <Cart />}
    </>
  );
};

export default App;
