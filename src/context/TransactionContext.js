import {createContext,useContext, useState} from 'react'
import { staticValues } from '../utils/constant';


export const UserContext = createContext({})

export const useTransactionContext = ()=> useContext(UserContext);

export function TransactionContext({children}) {
  const [transactionData, setTransactionData] = useState(staticValues)

  return (
    <>
     <UserContext.Provider value={{transactionData,setTransactionData}}>
        {children}
        </UserContext.Provider> 
    </>
  )
}



