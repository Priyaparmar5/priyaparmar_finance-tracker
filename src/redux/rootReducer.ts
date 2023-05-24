import { combineReducers } from 'redux';
import UserReducer from  "./ducks/UserReducer"
import TransactionReducer from './ducks/TransactionReducer';

export const rootReducer = combineReducers({
    users: UserReducer,
    transactions : TransactionReducer,
  });
  
  export type RootState = ReturnType<typeof rootReducer>;