import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./nav.css";

export default function Nav() {
  const navigate = useNavigate();

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
        </div>
      </div>
    </>
  );
}
