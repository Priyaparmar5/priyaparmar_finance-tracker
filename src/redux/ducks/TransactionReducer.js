import { createSlice } from "@reduxjs/toolkit";
import { staticValues } from "../../utils/constant";

const initialValues = {
  transactionDate: "",
  monthYear: "",
  transactionType: "",
  fromAccount: "",
  toAccount: "",
  amount: "",
  receipt: "",
  notes: "",
};

const TransactionReducer = createSlice({
  name: "transactions",
  initialState: { value: staticValues },

  reducers: {
    addTransaction(state, action) {
      const val = [...state.value, action.payload];
      //  state.value.push(action.payload)
      state.value = val;
      console.log(action, "actionnnnn");
    },
    deleteTransaction(state, action) {
      // const { id } = action.payload;
      // const uu = state.value.find((transaction) => transaction.id === id);
      // if (uu) {
      //   return state.value.filter((f) => f.id !== id);
      // }
      const id = action.payload;
      console.log(id,"iddddddss");
      state.value = state.value.filter(
        (transaction) => transaction.id !== id
      );
    console.log(state.transactions,"stateee");
    },
    updateTransaction(state, action) {
       
        const val= state.value.map((item)=>item.id  === action.payload.id 
        ? action.payload.data : item)
        console.log(val,"valllll");
        state.value = val;
       
    },
  },
});

export const { addTransaction, deleteTransaction, updateTransaction } =
  TransactionReducer.actions;

export default TransactionReducer.reducer;
