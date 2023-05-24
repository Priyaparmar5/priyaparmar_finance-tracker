import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { staticUsers } from "../../utils/constant";
import { userDetail } from "../../pages/Transaction";
//import { useDispatch, useSelector } from "react-redux";

interface UserState{
  user : userDetail[];
 // users : [key: string];
}
const initialState: UserState ={
  user : staticUsers,
  
}

const UserReducer = createSlice({
  name: "users",
  initialState,

  reducers: {
    registerTransaction(state,action:PayloadAction<userDetail>){
      
      state.user.push(action.payload);
        // const val = [...state.value, action.payload];
        // //  state.value.push(action.payload)
        // state.value = val;
        // console.log(action, "actionnnnn");
    },

  
  },
});

export const { registerTransaction } = UserReducer.actions;

export default UserReducer.reducer;
