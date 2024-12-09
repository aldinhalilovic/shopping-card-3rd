import baner from "./hero-container.png";
import CardMan from "../../components/cardMen/cardMen.jsx";
import "./homePage.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [homePageProducts, setHomePageProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHomePageProducs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://dummyjson.com/products?limit=10"
      );

      setHomePageProducts(response.data.products);
    } catch (error) {
      console.error("Error while fetching data", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHomePageProducs();
  }, []);

  return (
    <>
      <img src={baner} alt="Baner" className="baner" />

      <div className="naslov">
        <p>FEATURED PRODUCTS</p>

        <Button
          variant="filled"
          color="transparent"
          size="large"
          onClick={() => navigate("/products")}
        >
          View All
        </Button>
      </div>

      <div className="cardsDiv">
        {loading ? (
          <Spin size="large">Loading...</Spin>
        ) : (
          <CardMan products={homePageProducts} />
        )}
      </div>
    </>
  );
}
