import React,{useState} from 'react'
import "../App.css";
interface propName{
  myLocalStorageData:any,
  setMyLocalStorageData:any,
  tabledData:any,
  setCurrentPage:any,
  lastIndex:any,
  firstIndex:any,
}

const  Search:React.FC<propName> = ({myLocalStorageData,setMyLocalStorageData,tabledData,setCurrentPage,lastIndex,firstIndex}) =>{
    const [query, setQuery] = useState<any>('');
    const [currentPageData, setCurrentPageData] = useState([]);

    //const val = props.name;

    const onPageChange = (newPage:any, data:any) => {
      const filtered = data ? data : [...query];
      const start = (newPage - 1) * firstIndex;
      const end = newPage * lastIndex;
      setCurrentPage(newPage);
      setCurrentPageData(filtered.slice(start, end))
    }

  
    const handlesearch = (event:any) => {
        const getSearch = event.target.value;
        if (getSearch.length > 0) {
          const searchdata = myLocalStorageData.filter((item:any) =>
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
