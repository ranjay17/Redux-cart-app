import React from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { useSelector } from "react-redux";

export default function App() {
  const isVisible = useSelector((state) => state.cart.isVisible);

  return (
    <div>
      <Header />
      <ProductList />
      {isVisible && <Cart />}
    </div>
  );
}
