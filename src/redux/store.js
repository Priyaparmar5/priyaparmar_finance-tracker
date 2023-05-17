import { configureStore } from "@reduxjs/toolkit";
//import transactionSlice from "./ducks/transactionReducer";
import TransactionReducer from "./ducks/TransactionReducer";
import UserReducer from "./ducks/UserReducer";

const store = configureStore({
    reducer:{
        transactions : TransactionReducer,
        users : UserReducer,
    }
})


export default store;