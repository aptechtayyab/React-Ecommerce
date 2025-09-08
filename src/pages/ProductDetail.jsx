import React from "react";
import { useParams, Link } from "react-router-dom";
import { productData } from "../data/products";
import { useCart } from "../context/CartContext";
import DynamicTitle from "../hooks/DynamicTitle";

const ProductDetail = () => {
  DynamicTitle("Ecom - Product Details")
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = productData.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <main className="container py-5">
        <h1 className="display-6">Product not found</h1>
        <Link to="/products" className="btn btn-outline-secondary mt-3">
          Back to Products
        </Link>
      </main>
    );
  }

  const { image, title, price, description, category } = product;

  return (
    <main className="container py-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img src={image} alt={title} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h1 className="display-5">{title}</h1>
          <span className="badge bg-secondary mb-3">{category}</span>
          <p className="lead">{description}</p>
          <h3 className="fw-bold">${price}</h3>
          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-dark" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            <Link to="/products" className="btn btn-outline-secondary">
              Back
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
