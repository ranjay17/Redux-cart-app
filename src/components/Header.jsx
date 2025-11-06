import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store/cartSlice";

export default function Header() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header style={styles.header}>
      <h2>🛍️ Redux Cart App</h2>
      <button style={styles.btn} onClick={() => dispatch(toggleCart())}>
        Cart ({totalQty})
      </button>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#282c34",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
  },
  btn: {
    background: "#61dafb",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
