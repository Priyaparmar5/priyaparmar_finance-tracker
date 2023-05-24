import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { staticValues } from "../../utils/constant";
import { initialValue } from "../../pages/Transaction";

interface transactionState{
  
  transaction : initialValue[];
}
const initialState: transactionState ={
  transaction : staticValues,
  
}


const TransactionReducer = createSlice({
  name: "transactions",
  initialState,

  reducers: {
    addTransaction(state, action:PayloadAction<initialValue>) {
      // const val = [...state.value, action.payload];
      // //  state.value.push(action.payload)
      // state.value = val;
      // console.log(action, "actionnnnn");
      state.transaction.push(action.payload);

    },
    deleteTransaction(state, action) {
    
      const val= state.transaction.filter(
        (transaction) => transaction.id !== action.payload.id
      );
      state.transaction = val;
    console.log(action,"stateee");
    },
    updateTransaction(state, action:PayloadAction<any>) {
       
        const val= state.transaction.map((item)=>item.id  === action.payload.id 
        ? action.payload.data : item)
        console.log(val,"valllll");
        state.transaction = val;
       
    },
  },
});

export const { addTransaction , updateTransaction, deleteTransaction} =
  TransactionReducer.actions;

export default TransactionReducer.reducer;
