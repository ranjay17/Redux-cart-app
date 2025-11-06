import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        🛒 Cart is empty!
      </p>
    );
  }

  return (
    <div style={styles.cart}>
      <h3>My Cart</h3>
      {items.map((item) => (
        <div key={item.id} style={styles.item}>
          <span>{item.name}</span>
          <div>
            <button onClick={() => dispatch(removeFromCart(item))}>-</button>
            <span style={{ margin: "0 8px" }}>{item.quantity}</span>
            <button onClick={() => dispatch(addToCart(item))}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  cart: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "300px",
    margin: "20px auto",
    padding: "15px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
};
