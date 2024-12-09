import "./App.css";
import HomePage from "./assets/pages/homePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./assets/pages/shop/shop";
import Service from "./assets/pages/servi/service";
import Contact from "./assets/pages/contact/contact";
import Nav from "./assets/components/nav/nav";
import Footer from "./assets/components/footer/footer";
import Products from "./assets/pages/products/Products";

function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
