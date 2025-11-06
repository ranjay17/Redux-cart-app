import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Notification from "./components/Notification";
import { showNotification, clearNotification } from "./store/notificationSlice";
import { replaceCart } from "./store/cartSlice";

const App = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.cart.isVisible);
  const items = useSelector((state) => state.cart.items);
  const notification = useSelector((state) => state.notification.notification);
  const isInitial = useRef(true);

  // --- Fetch cart data when page loads ---
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
        dispatch(replaceCart(data[0]?.items || [])); // Extract saved items

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
        console.error(error);
      }
    };

    fetchCartData();
  }, [dispatch]);

  // --- Sync cart whenever items change ---
  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    const sendCartData = async () => {
      dispatch(
        showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );

      try {
        const response = await fetch(
          "https://crudcrud.com/api/374f5f7d68934e64aa18767ac4e208fa/cart",
          {
            method: "POST",
            body: JSON.stringify({ items }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Sending cart data failed!");

        dispatch(
          showNotification({
            status: "success",
            title: "Success!",
            message: "Sent cart data successfully!",
          })
        );
      } catch (error) {
        dispatch(
          showNotification({
            status: "error",
            title: "Error!",
            message: "Sending cart data failed!",
          })
        );
        console.error(error);
      }
    };

    if (items.length > 0) {
      sendCartData();
    }
  }, [items, dispatch]);

  // --- Auto remove notification after 3 seconds ---
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000); // 3 seconds delay
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
