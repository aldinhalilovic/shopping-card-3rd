import { Button, Drawer } from "antd";
import { useState } from "react";
import "./shop.css";
import ShopCard from "../../components/shopCard/shopCard";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Shop() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const { favorites } = useContext(AppContext);

  return (
    <>
      <Button type="primary" onClick={showDrawer} className="btnFilter">
        FILTER
      </Button>

      <Drawer title="FILTERS" onClose={onClose} open={open} placement="left">
        <form action="">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Pants</label>
            </div>
            <div>
              <input type="checkbox" name="" id="" />
              <label htmlFor="">T-shirt</label>
            </div>
            <div>
              {" "}
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Jacket</label>
            </div>
            <div>
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Hoodie</label>
            </div>
            <div>
              {" "}
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Suits</label>
            </div>
            <div>
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Overzise shirts</label>
            </div>
            <button>filtriraj</button>
          </div>
        </form>
      </Drawer>

      {favorites.length > 0 ? (
        <div className="shopGlavni">
          {favorites.map((product) => (
            <ShopCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <div
          style={{
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <h1>Nema proizvoda, molimo vas izaberite neke</h1>
          <Button onClick={() => navigate("/products")}>Proizvodi</Button>
        </div>
      )}
    </>
  );
}
