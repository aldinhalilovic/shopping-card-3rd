import { Button, Drawer } from "antd";
import { useState } from "react";
import "./shop.css";
import ShopCard from "../../components/shopCard/shopCard";
import cardImg1 from "./Rectangle 3.png";
import cardImg2 from "./Rectangle 4.png";
import cardImg3 from "./Rectangle 5.png";
import cardImg4 from "./Rectangle 6.png";
export default function Shop() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
      <div className="shopGlavni">
        <ShopCard title="Winter jacket" description="$110" image={cardImg2} />
        <ShopCard title="T-shirt" description="$50" image={cardImg3} />
        <ShopCard title="T-shirt " description="$50" image={cardImg4} />
        <ShopCard title="Outhum jacket" description="$50" image={cardImg1} />
        <ShopCard title="Outhum jacket" description="$50" image={cardImg1} />
        <ShopCard title="T-shirt" description="$50" image={cardImg3} />
        <ShopCard title="Winter jacket" description="$110" image={cardImg2} />
        <ShopCard title="T-shirt " description="$50" image={cardImg4} />
        <ShopCard title="Winter jacket" description="$110" image={cardImg2} />
        <ShopCard title="Outhum jacket" description="$50" image={cardImg1} />
        <ShopCard title="T-shirt " description="$50" image={cardImg4} />
        <ShopCard title="T-shirt" description="$50" image={cardImg3} />
      </div>
    </>
  );
}
