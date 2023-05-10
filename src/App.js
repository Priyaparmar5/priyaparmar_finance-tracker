import './App.css';
import Pagination from './components/Pagination';
import TransactionForm from './components/TransactionForm';
import ViewData from './components/ViewData';
import ViewDetail from './components/ViewDetail.js';
import EditTransaction from './components/EditTransaction';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import Search from './components/Search';
import Unauth from './Services/Unauth';
import { TransactionContext } from './context/TransactionContext';

function App() {
  return (
    <>
    <TransactionContext.Provider>
    <Unauth/>
  <TransactionForm/>
  <Home/>
  <Login/>
  <Search/>
  <Registration/>
  <ViewData/>
  <ViewDetail/>
  <Pagination/>
  <EditTransaction/>
  </TransactionContext.Provider>
  </>
  );
}

export default App;
