// src/pages/Invoice.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DynamicTitle from "../hooks/DynamicTitle";

const Invoice = () => {
  DynamicTitle("Ecom - Invoice")
  
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("lastOrder");
      if (raw) {
        setOrder(JSON.parse(raw));
      }
    } catch (err) {
      console.error("Failed to read lastOrder", err);
    }
  }, []);

  if (!order) {
    return (
      <main className="container py-5 text-center">
        <h3>No recent order found</h3>
        <Link to="/products" className="btn btn-primary mt-3">
          Browse Products
        </Link>
      </main>
    );
  }

  const formatDate = (iso) => new Date(iso).toLocaleString();

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h3>Invoice</h3>
          <div>Order ID: <strong>{order.id}</strong></div>
          <div>Date: {formatDate(order.date)}</div>
        </div>
        <div className="text-end">
          <button className="btn btn-outline-secondary me-2" onClick={() => window.print()}>
            Print
          </button>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <h5>Billing To</h5>
          <div>{order.customer.firstName} {order.customer.lastName}</div>
          <div>{order.customer.address}</div>
          <div>{order.customer.city} - {order.customer.postalCode}</div>
          <div>{order.customer.email}</div>
          <div>{order.customer.phone}</div>
        </div>

        <div className="col-md-6 text-end">
          <h5>Summary</h5>
          <div>Items: {order.items.length}</div>
          <div>Subtotal: ${Number(order.subtotal).toFixed(2)}</div>
          <div>Shipping: ${Number(order.shipping || 0).toFixed(2)}</div>
          <h4>Total: ${Number(order.total).toFixed(2)}</h4>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Title</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it) => (
              <tr key={it.id}>
                <td style={{ width: 100 }}>
                  <img src={it.image} alt={it.title} style={{ width: 80, height: 80, objectFit: "cover" }} />
                </td>
                <td>{it.title}</td>
                <td>${Number(it.price).toFixed(2)}</td>
                <td>{it.quantity}</td>
                <td>${(Number(it.price) * Number(it.quantity)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Invoice;
