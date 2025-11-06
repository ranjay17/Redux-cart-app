import React from "react";

const Notification = ({ status, title, message }) => {
  let bgColor;
  if (status === "pending") bgColor = "#007bff";
  if (status === "success") bgColor = "#28a745";
  if (status === "error") bgColor = "#dc3545";

  return (
    <section style={{ ...styles.notification, backgroundColor: bgColor }}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

const styles = {
  notification: {
    color: "white",
    padding: "10px",
    textAlign: "center",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
};

export default Notification;
