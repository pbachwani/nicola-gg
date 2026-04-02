import { createContext, useContext } from "react";
export const PreloaderContext = createContext(false);
export const usePreloader = () => useContext(PreloaderContext);
