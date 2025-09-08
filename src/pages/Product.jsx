import React, { useState } from "react";
import Card from "../components/Card";
import { productData } from "../data/products";
import DynamicTitle from "../hooks/DynamicTitle";

const Product = () => {
  DynamicTitle("Ecom - Products")
  // Unique categories nikalne ka tareeqa
  const categories = [...new Set(productData.map((p) => p.category))];

  // State for search and category
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filtered products logic
  const filteredProducts = productData.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <main className="p-3">
        <h1 className="display-2 fw-bold text-center">Explore Our Products</h1>
        <hr />
        <div className="container">
          <div className="row">
            {/* Search Box */}
            <div className="col-6">
              <div className="form-group mb-3">
                <label htmlFor="search" className="form-label">
                  Search
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Search Products"
                  className="form-control"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="col-6">
              <label htmlFor="category" className="form-label">
                Filter by category
              </label>
              <select
                id="category"
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option value={category} key={index}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="col-4 mb-4" key={product.id}>
                  <Card
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    category={product.category}
                  />
                </div>
              ))
            ) : (
              <p className="text-center fs-4 mt-4">No products found.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
