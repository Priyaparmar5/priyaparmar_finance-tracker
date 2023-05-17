import { createSlice } from "@reduxjs/toolkit";
import { staticUsers } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";



const UserReducer = createSlice({
  name: "users",
  initialState: { value: staticUsers },

  reducers: {
    registerTransaction(state,action){
        const val = [...state.value, action.payload];
        //  state.value.push(action.payload)
        state.value = val;
        console.log(action, "actionnnnn");
    },

  
  },
});

export const { registerTransaction, loginTransaction } = UserReducer.actions;

export default UserReducer.reducer;
