import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice"

const products = [
  { id: 1, name: "Laptop", price: 60000 },
  { id: 2, name: "Headphones", price: 2500 },
];

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div style={styles.container}>
      {products.map((product) => (
        <div key={product.id} style={styles.card}>
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <button
            style={styles.btn}
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
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
    width: "180px",
  },
  btn: {
    background: "#61dafb",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
