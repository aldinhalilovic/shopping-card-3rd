import { useState } from "react";
import { createContext } from "react";

const AppContext = createContext();

function ContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const values = {
    favorites,
    setFavorites,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export { AppContext, ContextProvider };
