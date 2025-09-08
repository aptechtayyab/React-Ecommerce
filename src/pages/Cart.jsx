import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import DynamicTitle from "../hooks/DynamicTitle";

const Cart = () => {
  DynamicTitle("Ecom - Cart")
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="container py-5 text-center">
        <h2>Your cart is empty 🛒</h2>
        <Link to="/products" className="btn btn-primary mt-3">
          Go to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <h2 className="mb-4">Your Cart 🛒</h2>
      <ul className="list-group mb-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center gap-3">
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "70px", height: "70px", objectFit: "cover" }}
                className="rounded"
              />
              {/* Product Details */}
              <div>
                <h5 className="mb-1">{item.title}</h5>
                <p className="mb-1">
                  ${item.price} x {item.quantity} ={" "}
                  <strong>${item.price * item.quantity}</strong>
                </p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => decreaseQuantity(item.id)}
              >
                -
              </button>
              <span className="fw-bold">{item.quantity}</span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h4>Total: ${totalPrice.toFixed(2)}</h4>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-outline-danger" onClick={clearCart}>
          Clear Cart
        </button>
        <Link to="/checkout" className="btn btn-success">
          Proceed to Checkout
        </Link>
      </div>
    </main>
  );
};

export default Cart;
