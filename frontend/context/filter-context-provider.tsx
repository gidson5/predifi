"use client"
import { createContext, useState } from "react";

export const FilterContext = createContext<{
  getType: string;
  setGetType: React.Dispatch<React.SetStateAction<string>>;
}>({
  getType: "",
  setGetType: () => {},
});

function FilterContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [getType,setGetType] = useState("active")
  return <FilterContext.Provider value={{getType,setGetType}}>{children}</FilterContext.Provider>;
}
export default FilterContextProvider;