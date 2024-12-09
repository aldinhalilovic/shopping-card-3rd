/* eslint-disable react/prop-types */
import { Card } from "antd";

const { Meta } = Card;

export default function CardMan({ products }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {products.map((product, index) => (
        <Card
          key={index}
          hoverable
          style={{ width: 240, textAlign: "center" }}
          cover={<img alt={`product ${index + 1}`} src={product.thumbnail} />}
        >
          <Meta title={product.title} description={product.description} />
        </Card>
      ))}
    </div>
  );
}
