import React, { useEffect, useState } from 'react';
import './App.css';
import { getBeanieBabies } from './services/fetch-utils';
import BeaniesList from './BeaniesList';

export default function BeaniesPage() {
  const [beanieBabies, setBeanieBabies] = useState([]);
  const [lastPage, setLastPage] = useState(100);
  const [page, setPage] = useState(1);
  // const [searchedBeanies, setSearchedBeanies] = useState([]);
  // const perPage = 40;
  
  useEffect(() => {
    async function fetch() {
      const beanies = await getBeanieBabies(page);

      setBeanieBabies(beanies.body);
      setLastPage(beanies.lastPage);
    }

    fetch();
  }, [page]); // what can you do with this array to trigger a fetch every time the page changes?


  // useEffect(() => {
  //   async function searchBeanies(userInput) {
  //     if (userInput) {
  //       const matchingBeanieBabies = beanieBabies
  //         .filter(beanieBaby => beanieBaby.title.toLowerCase()
  //           .includes(userInput.toLowerCase())
  //         );
  //       setSearchedBeanies([...matchingBeanieBabies]);
  //     } else {
  //       setSearchedBeanies([...beanieBabies]);
  //     }
  //   }
  //   searchBeanies();
  // }, [page]);

  return (
    <>
      <h2>Page {page}</h2>
      {/* <div>
        Search for Beanie Babies by Title
        <input onChange={e => searchBeanies(e.target.value)} /> */}
      {/* </div> */}
      <div className='buttons'>
        {/* on click, this button should decrement the page in state  */}
        {/* also, disable this button when you are on the first page */}
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous Page</button>
        {/* on click, this button should increment the page in state  */}
        <button disabled={page >= lastPage} 
          onClick={() => setPage(page + 1)}>Next Page</button>
        {/* disabled={page >= lastPage} */}
      </div>
      {/* pass the beanie babies into the BeaniesList component */}
      <BeaniesList beanieBabies={beanieBabies} />
    </>
  );
}

