import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";

const { Meta } = Card;

export default function shopCard({
  title,
  description,
  image,
  favorite,
  changeFavorite,
}) {
  return (
    <Card
      hoverable
      style={{ width: 240, textAlign: "center" }}
      cover={<img alt={title} src={image} />}
    >
      <div onClick={changeFavorite}>
        {favorite ? (
          <HeartFilled
            style={{
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
      <Meta title={title} description={description} />
    </Card>
  );
}
