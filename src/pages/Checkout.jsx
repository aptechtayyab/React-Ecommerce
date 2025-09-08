// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import DynamicTitle from "../hooks/DynamicTitle";

const Checkout = () => {
  DynamicTitle("Ecom - Checkout");
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    postalCode: "",
    city: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  // Custom Regex Validators
  const regex = {
    name: /^[A-Za-z\s]{2,50}$/, // Only letters & spaces, 2–50 chars
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, // Basic but strict email
    phone: /^[0-9+\-\s]{6,20}$/, // Digits, +, - , space, 6–20 length
    postalCode: /^[A-Za-z0-9\s\-]{3,12}$/, // Allow alphanumeric, -, space
    city: /^[A-Za-z\s]{2,50}$/, // Only letters, min 2 chars
    address: /^.{5,200}$/, // Any chars, 5–200 length
  };

  // Validate Function
  const validate = () => {
    const e = {};

    if (!regex.name.test(form.firstName))
      e.firstName = "First name must be 2–50 letters only.";
    if (!regex.name.test(form.lastName))
      e.lastName = "Last name must be 2–50 letters only.";
    if (!regex.email.test(form.email))
      e.email = "Enter a valid email address (e.g. user@mail.com).";
    if (!regex.phone.test(form.phone))
      e.phone = "Phone must be 6–20 digits and may include +, -, or spaces.";
    if (!regex.postalCode.test(form.postalCode))
      e.postalCode = "Postal code must be 3–12 characters (letters/numbers).";
    if (!regex.city.test(form.city)) e.city = "City must be 2–50 letters only.";
    if (!regex.address.test(form.address))
      e.address = "Address must be 5–200 characters.";

    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const generateOrderId = () => {
    return (
      "ORD-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random().toString(36).slice(2, 7).toUpperCase()
    );
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty. Add products before placing order.");
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const orderId = generateOrderId();
    const order = {
      id: orderId,
      date: new Date().toISOString(),
      customer: { ...form },
      items: cartItems.map((i) => ({
        id: i.id,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      })),
      subtotal:
        Number(totalPrice) ||
        cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
      shipping: 0,
      total:
        Number(totalPrice) ||
        cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
    };

    try {
      const raw = localStorage.getItem("orders");
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(order);
      localStorage.setItem("orders", JSON.stringify(arr));
      localStorage.setItem("lastOrder", JSON.stringify(order));
    } catch (err) {
      console.error("Failed to save order", err);
    }

    clearCart();
    navigate("/invoice");
  };

  return (
    <main className="container py-5">
      <h2>Checkout</h2>

      <div className="row">
        {/* Form */}
        <div className="col-md-7">
          <form onSubmit={handlePlaceOrder} noValidate>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">First name</label>
                <input
                  name="firstName"
                  className="form-control"
                  value={form.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <div className="text-danger small">{errors.firstName}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Last name</label>
                <input
                  name="lastName"
                  className="form-control"
                  value={form.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <div className="text-danger small">{errors.lastName}</div>
                )}
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="text-danger small">{errors.email}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <div className="text-danger small">{errors.phone}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Postal Code</label>
                <input
                  name="postalCode"
                  className="form-control"
                  value={form.postalCode}
                  onChange={handleChange}
                />
                {errors.postalCode && (
                  <div className="text-danger small">{errors.postalCode}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <input
                  name="city"
                  className="form-control"
                  value={form.city}
                  onChange={handleChange}
                />
                {errors.city && (
                  <div className="text-danger small">{errors.city}</div>
                )}
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Address</label>
                <textarea
                  name="address"
                  className="form-control"
                  value={form.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <div className="text-danger small">{errors.address}</div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="col-md-5 mt-4">
          <div className="card p-3">
            <h5>Order Summary</h5>
            <hr />
            {cartItems.map((i) => (
              <div key={i.id} className="d-flex align-items-center mb-2">
                <img
                  src={i.image}
                  alt={i.title}
                  style={{ width: 60, height: 60, objectFit: "cover" }}
                  className="me-2 rounded"
                />
                <div>
                  <div className="fw-bold">{i.title}</div>
                  <div className="small">
                    {i.quantity} × ${Number(i.price).toFixed(2)}
                  </div>
                </div>
                <div className="ms-auto">
                  ${(i.quantity * i.price).toFixed(2)}
                </div>
              </div>
            ))}

            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <strong>${Number(totalPrice || 0).toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
