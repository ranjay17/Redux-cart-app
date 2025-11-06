import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Headphones" },
];

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div style={styles.container}>
      {products.map((product) => (
        <div key={product.id} style={styles.card}>
          <h3>{product.name}</h3>
          <div>
            <button onClick={() => dispatch(removeFromCart(product))}>-</button>
            <button onClick={() => dispatch(addToCart(product))}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "30px",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    width: "150px",
  },
};
