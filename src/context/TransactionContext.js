import { createContext, useContext, useState } from "react";
import { staticValues,staticData } from "../utils/constant";

export const UserContext = createContext({});

export const useGlobalContext = () => useContext(UserContext);

export function TransactionContext({ children }) {
  const [transactionData, setTransactionData] = useState(staticValues);
  const [registerData, setRegisterData] = useState(staticData);


  return (
    <>
      <UserContext.Provider value={{ transactionData, setTransactionData, registerData, setRegisterData }}>
        {children}
      </UserContext.Provider>
    </>
  );
}
