import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { staticValues } from "../../utils/constant";
import { initialValue } from "../../utils/Transaction";

interface transactionState {
  transaction: initialValue[];
}
const initialState: transactionState = {
  transaction: staticValues,
};

const TransactionReducer = createSlice({
  name: "transactions",
  initialState,

  reducers: {
    addTransaction(state, action: PayloadAction<initialValue>) {
      const val = [...state.transaction, action.payload];
      //  state.value.push(action.payload)
      state.transaction = val;
      console.log(action, "actionnnnn");
     
    },
    deleteTransaction(state, action) {
      const val = state.transaction.filter(
        (transaction) => transaction.id !== action.payload.id
      );
      state.transaction = val;
      console.log(action, "stateee");
    },
    updateTransaction(state, action: PayloadAction<any>) {
      const val = state.transaction.map((item) =>
        item.id === action.payload.id ? action.payload.data : item
      );

      state.transaction = val;
      console.log(val, "valllll");
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } =
  TransactionReducer.actions;

export default TransactionReducer.reducer;