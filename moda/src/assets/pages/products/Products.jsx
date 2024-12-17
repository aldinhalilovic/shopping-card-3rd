import {
  Checkbox,
  Drawer,
  FloatButton,
  notification,
  Pagination,
  Spin,
} from "antd";
import { useState } from "react";
import "./weedings.css";
import ShopCard from "../../components/shopCard/shopCard";
import axios from "axios";
import { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

export default function Products() {
  // notifications
  const [api, contextHolder] = notification.useNotification();

  const { favorites, setFavorites } = useContext(AppContext);

  // drawer
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(30);
  const [totalProducts, setTotalProducts] = useState(null);

  // content
  const [allProducts, setAllProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const changeFavorite = (id) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        api.info({
          message: `You have removed product from your cart!`,
          placement: "topRight",
        });
        return prevFavorites.filter((product) => product !== id);
      } else {
        api.info({
          message: `You have successfully added product to your cart!`,
          placement: "topRight",
        });
        return [...prevFavorites, id];
      }
    });
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const fetchHomePageProducs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
          productsPerPage * (currentPage - 1)
        }`
      );

      console.log(response.data);
      setTotalProducts(response.data.total);

      setAllProducts(response.data.products);
    } catch (error) {
      console.error("Error while fetching data", error);
    }

    setLoading(false);
  };

  const fetchCategoryList = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/category-list"
      );

      setCategoryList(response.data);
    } catch (error) {
      console.error("Error while fetching data", error);
    }
  };

  const selectCategory = (categories) => {
    console.log(categories, "CATEGORIES");

    api.open({
      message: "Congratulations",
      description: "You have successfully selected " + categories[0],
      duration: 5,
    });
  };

  useEffect(() => {
    fetchHomePageProducs();
  }, [currentPage]);

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <>
      {contextHolder}

      <FloatButton
        onClick={showDrawer}
        shape="circle"
        type="primary"
        style={{ insetInlineEnd: 50, height: 75, width: 75 }}
        icon={<SearchOutlined />}
      />
      <Drawer title="FILTERS" onClose={onClose} open={open} placement="left">
        <Checkbox.Group
          style={{ gap: 20, textTransform: "capitalize" }}
          options={categoryList}
          onChange={selectCategory}
        />
      </Drawer>
      <div className="shopGlavni">
        {loading ? (
          <Spin size="large">Loading...</Spin>
        ) : (
          allProducts.map((product) => (
            <ShopCard
              key={product.id}
              product={product}
              favorite={favorites.includes(`${product.id}`)}
              changeFavorite={() => changeFavorite(`${product.id}`)}
            />
          ))
        )}
      </div>
      <Pagination
        align="center"
        style={{ margin: "40px 0" }}
        current={currentPage}
        total={totalProducts}
        showSizeChanger={false}
        pageSize={30}
        onChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
