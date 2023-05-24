import { omit } from 'lodash';
import {React,useState} from 'react'
import "../App.css";

const  Search = ({myLocalStorageData,setMyLocalStorageData,tabledData,setCurrentPage,lastIndex,firstIndex}) =>{
    const [query, setQuery] = useState('');
    const [currentPageData, setCurrentPageData] = useState([]);

    //const val = props.name;

    const onPageChange = (newPage, data) => {
      const filtered = data ? data : [...query];
      const start = (newPage - 1) * firstIndex;
      const end = newPage * lastIndex;
      setCurrentPage(newPage);
      setCurrentPageData(filtered.slice(start, end))
    }

  
    const handlesearch = (event) => {
        const getSearch = event.target.value;
        if (getSearch.length > 0) {
          const searchdata = myLocalStorageData.filter((item) =>
            item.notes.toLowerCase().includes(getSearch) ||  item.transactionDate.includes(getSearch)||
            item.transactionType.toLowerCase().includes(getSearch) ||  item.fromAccount.toLowerCase().includes(getSearch) ||
            item.toAccount.toLowerCase().includes(getSearch)|| item.monthYear.toLowerCase().includes(getSearch) ||  item.amount.includes(getSearch) 
          );
          setMyLocalStorageData(searchdata);
          onPageChange(1,searchdata);
        } else {
          setMyLocalStorageData(tabledData);
        }
        setQuery(getSearch);
      
      };
  return (
    <div>
      <input
          type="text"
          value={query}
          onChange={(e) => handlesearch(e)}
          className="input-search"
          placeholder="search here..."
        ></input>
    </div>
  )
}

export default Search
