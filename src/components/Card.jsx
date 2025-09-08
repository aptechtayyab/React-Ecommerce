import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ import toast
import "../css/home.css";

const Card = (props) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: props.id,
      title: props.title,
      image: props.image,
      price: props.price,
      description: props.description,
      category: props.category,
    });

    // ✅ Toast notification
    toast.success(`${props.title} added to cart 🛒`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  return (
    <div className="card" style={{ width: "20rem" }}>
      <div className="card-category">{props.category}</div>
      <img src={props.image} className="card-img-top" alt={props.title} />
      <div className="card-body">
        <h5 className="card-title fw-bold">{props.title}</h5>
        <p>{props.description}</p>
        <h4 className="fw-bold">${props.price}</h4>

        <Link to={`/products/${props.id}`} className="btn btncard me-3">
          View Details
        </Link>

        <button className="btn btncard" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
