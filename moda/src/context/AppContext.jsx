import { useState } from "react";
import { createContext } from "react";

const AppContext = createContext();

function ContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addProductToFavorites = (product) => {
    setFavorites((prevFav) => {
      if (prevFav.find((prev) => prev.id === product.id)) {
        return prevFav.filter((prevs) => prevs.id !== product.id);
      } else {
        return [...prevFav, product];
      }
    });
  };

  const values = {
    favorites,
    setFavorites,
    addProductToFavorites,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export { AppContext, ContextProvider };
