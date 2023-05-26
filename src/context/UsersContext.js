import { createContext, useContext, useState } from "react";
import { staticData } from "../utils/constant";

export const MyContext = createContext({});

export const useGlobalContext = () => useContext(MyContext);

export function UsersContext({ children }) {
  const [registerData, setRegisterData] = useState(staticData);

  return (
    <>
      <MyContext.Provider value={{ registerData, setRegisterData }}>
        {children}
      </MyContext.Provider>
    </>
  );
}
