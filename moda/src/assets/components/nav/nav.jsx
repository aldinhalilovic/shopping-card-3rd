import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./nav.css";
import { Badge } from "antd";
import { AppContext } from "../../../context/AppContext";
import { useContext } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const { favorites } = useContext(AppContext);

  return (
    <>
      <div className="nav1">
        <p>MEGA SALE</p>
        <p>Take 10% off</p>
      </div>

      <div className="nav2">
        <div>
          <img src={logo} alt="" />
        </div>

        <div className="nav22">
          <Link to={"/"} style={{ color: "black", textDecoration: "none" }}>
            HOME PAGE
          </Link>

          <Link
            to={"/products"}
            style={{ color: "black", textDecoration: "none" }}
          >
            Products
          </Link>
        </div>
        <div>
          <Badge count={favorites.length}>
            <UserOutlined
              onClick={() => navigate("/shop")}
              style={{
                fontSize: "3vh",
                color: "black",
                paddingRight: "5px",
                fontWeight: "900",
                font: "bold",
              }}
            />
          </Badge>
        </div>
      </div>
    </>
  );
}
