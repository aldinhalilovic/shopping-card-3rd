import {
  Checkbox,
  Drawer,
  FloatButton,
  notification,
  Pagination,
  Spin,
} from "antd";
import { useState, useEffect, useContext } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Input from "antd/es/input/Input";
import axios from "axios";
import { useDebounce } from "../../../utils";
import { AppContext } from "../../../context/AppContext";
import ShopCard from "../../components/shopCard/shopCard";
import "./weedings.css";

export default function Products() {
  // Notification
  const [api, contextHolder] = notification.useNotification();

  // Context
  const { favorites, setFavorites } = useContext(AppContext);

  // State Management
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(30);
  const [totalProducts, setTotalProducts] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [allProducts, setAllProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // Handlers
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter((product) => product !== id)
        : [...prevFavorites, id];

      api.info({
        message: `Product ${
          prevFavorites.includes(id) ? "removed from" : "added to"
        } your cart!`,
        placement: "topRight",
      });

      return updatedFavorites;
    });
  };

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const handleCategorySelect = async (categories) => {
    const selectedCategory = categories[0];
    setFilter(selectedCategory);

    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/category/${selectedCategory}`
      );

      setAllProducts(data.products);
      setTotalProducts(data.total);

      api.success({
        message: "Category Selected",
        description: `You have successfully selected ${selectedCategory}.`,
        duration: 5,
      });
    } catch (error) {
      console.error("Error fetching category products", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
          productsPerPage * (currentPage - 1)
        }`
      );
      setAllProducts(data.products);
      setTotalProducts(data.total);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://dummyjson.com/products/category-list"
      );
      setCategoryList(data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const searchProducts = () => {
    if (!debouncedSearch) {
      fetchProducts();
      return;
    }

    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().startsWith(debouncedSearch.toLowerCase())
    );
    setAllProducts(filteredProducts);
    setTotalProducts(filteredProducts.length);
  };

  // Effects
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    searchProducts();
  }, [debouncedSearch]);

  return (
    <div>
      {contextHolder}

      {/* Drawer */}
      <FloatButton
        onClick={handleDrawerOpen}
        shape="circle"
        type="primary"
        style={{ insetInlineEnd: 50, height: 75, width: 75 }}
        icon={<SearchOutlined />}
      />
      <Drawer
        title="Filters"
        onClose={handleDrawerClose}
        open={drawerOpen}
        placement="left"
      >
        <Checkbox.Group
          style={{ gap: 20, textTransform: "capitalize" }}
          options={categoryList}
          value={filter}
          onChange={handleCategorySelect}
        />
      </Drawer>

      {/* Search */}
      <div style={{ margin: "30px auto", width: "max-content" }}>
        <Input
          style={{ width: "350px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Product List */}
      <div className="shopGlavni">
        {loading ? (
          <Spin size="large" />
        ) : allProducts.length > 0 ? (
          allProducts.map((product) => (
            <ShopCard
              key={product.id}
              product={product}
              favorite={favorites.includes(product.id)}
              changeFavorite={() => toggleFavorite(product.id)}
            />
          ))
        ) : (
          <h1>No products available</h1>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        align="center"
        style={{ margin: "40px 0" }}
        current={currentPage}
        total={totalProducts}
        showSizeChanger={false}
        pageSize={productsPerPage}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
