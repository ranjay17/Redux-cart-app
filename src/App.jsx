import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Notification from "./components/Notification";
import { showNotification } from "./store/notificationSlice";

const App = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.cart.isVisible);
  const items = useSelector((state) => state.cart.items);
  const notification = useSelector((state) => state.notification.notification);


  // Simulate sending data whenever cart changes
  useEffect(() => {
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
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            body: JSON.stringify({ items }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) {
          throw new Error("Sending cart data failed!");
        }

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
        console.log(error);
      }
    };

    if (items.length > 0) {
      sendCartData();
    }
  }, [items, dispatch]);

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
}

export default App;