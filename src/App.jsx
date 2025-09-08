
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./css/index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import ScrollToTop from "./hooks/ScrollToTop";
const App = () => {
  return (
    <CartProvider>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/products" Component={Product} />
        <Route path="/products/:id" Component={ProductDetail} />
        <Route path="/cart" Component={Cart} />
        <Route path="/checkout" Component={Checkout} />
        <Route path="/invoice" Component={Invoice} />
      </Routes>
      <Footer />
    </CartProvider>
  );
};

export default App;
