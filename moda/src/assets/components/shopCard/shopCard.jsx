/* eslint-disable react/prop-types */
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const { Meta } = Card;

export default function ShopCard({ product }) {
  const { favorites, addProductToFavorites } = useContext(AppContext);

  const isFavorite = favorites.find((favorit) => favorit.id === product.id);

  console.log(favorites, "FAVORITES");

  return (
    <Card
      hoverable
      style={{ width: 240, textAlign: "center" }}
      cover={<img alt={product.title} src={product.thumbnail} />}
    >
      <div
        style={{ position: "absolute", top: 10, right: 10 }}
        onClick={() => addProductToFavorites(product)}
      >
        {isFavorite ? (
          <HeartFilled
            style={{
              color: "red",
              fontSize: 25,
            }}
          />
        ) : (
          <HeartOutlined
            style={{
              fontSize: 25,
            }}
          />
        )}
      </div>
      <Meta title={product.title} description={product.description} />
    </Card>
  );
}
