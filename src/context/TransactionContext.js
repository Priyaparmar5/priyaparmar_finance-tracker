import { createContext, useContext, useState } from "react";
import { staticValues } from "../utils/constant";

export const UserContext = createContext({});

export const useGlobalContext = () => useContext(UserContext);

export function TransactionContext({ children }) {
  const [transactionData, setTransactionData] = useState(staticValues);
  const [groupData, setGroupData] = useState([]);

  return (
    <>
      <UserContext.Provider value={{ transactionData, setTransactionData, groupData,setGroupData }}>
        {children}
      </UserContext.Provider>
    </>
  );
}
