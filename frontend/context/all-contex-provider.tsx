"use client"
import { createContext, useState } from "react";

export const AllFilterContext = createContext<{
  getType: string;
  setGetType: React.Dispatch<React.SetStateAction<string>>;
}>({
  getType: "",
  setGetType: () => {},
});

function AllFilterContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [getType,setGetType] = useState("active")
  return <AllFilterContext.Provider value={{getType,setGetType}}>{children}</AllFilterContext.Provider>;
}
export default AllFilterContextProvider;