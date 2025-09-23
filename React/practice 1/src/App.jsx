import React from "react";
import "./App.css";

// ProductCard component (defined inside the same file)
const ProductCard = ({ name, price, status }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "12px",
      padding: "16px",
      width: "200px",
      margin: "10px",
      textAlign: "center",
      boxShadow: "2px 2px 6px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "8px" }}>{name}</h2>
      <p>Price: ${price}</p>
      <p style={{ color: status === "In Stock" ? "green" : "red" }}>
        Status: {status}
      </p>
    </div>
  );
};

// Main App component
function App() {
  const products = [
    { name: "Wireless Mouse", price: 25.99, status: "In Stock" },
    { name: "Keyboard", price: 45.5, status: "Out of Stock" },
    { name: "Monitor", price: 199.99, status: "In Stock" },
  ];

  return (
    <div style={{
      border: "1px solid black",
      padding: "20px",
      margin: "20px",
      textAlign: "center"
    }}>
      <h1 style={{ fontWeight: "bold", fontSize: "22px", marginBottom: "20px" }}>
        Products List
      </h1>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            status={product.status}
          />
        ))}
      </div>
    </div>
  );
}

export default App;