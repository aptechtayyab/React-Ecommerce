import "../css/home.css";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { productData } from "../data/products";
import DynamicTitle from "../hooks/DynamicTitle";

const Home = () => {
  DynamicTitle("Ecom - Home");

  return (
    <>
      <div className="banner-container">
        <div className="banner-content">
          <h1>POLOS & SAFARIS</h1>
          <h3>Explore our premium products</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
            mollitia recusandae laudantium explicabo iste est, facere dolorum
            consectetur labore consequatur.
          </p>
          <div>
            <a className="btn btn-banner">Explore</a>
            <a className="btn btn-banner">Shop now</a>
          </div>
        </div>
        <div className="banner-image">
          <img src="./homebanner.jpg" alt="" style={{ width: "100%" }} />
        </div>
      </div>

      <div className="container card-section">
        <h1 className="text-center fw-bold display-3">New Arrivals</h1>
        <hr />
        {/* Horizontal scroll div */}
        <div className="card-scroll">
          {productData.map((product) => (
            <div className="card-item" key={product.id}>
              <Card
                image={product.image}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
              />
            </div>
          ))}
        </div>
      </div>

      <section>
        <h1 className="mx-5">Featured Collection</h1>
        <hr />
        <div className="featured-section">
          <div className="featured-sub-section">
            <h1>T-SHIRTS</h1>
          </div>
        </div>
      </section>

      <div className="news-letter-section">
        <h1>SUBSCRIBE OUR NEWSLETTER</h1>
        <form action="">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <a href="" className="btn">Subscribe</a>
        </form>
      </div>
    </>
  );
};

export default Home;
