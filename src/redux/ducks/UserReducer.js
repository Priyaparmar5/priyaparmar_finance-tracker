import { createSlice } from "@reduxjs/toolkit";
import { staticUsers } from "../../utils/constant";

const UserReducer = createSlice({
  name: "users",
  initialState: { value: staticUsers },

  reducers: {
    registerTransaction(state,action){
        state.value.push(action.payload)
      //  state.value = val;
        console.log(action, "actionnnnn");
    },

  },
});

export const { registerTransaction, loginTransaction } = UserReducer.actions;

export default UserReducer.reducer;
