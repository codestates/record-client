import React, { useState } from 'react';
import styles from '../Search/Search.module.css';
import Navbar from '../Navbar/Navbar';
const Search = (props) => {
  const [search, setSearch] = useState('');

  const searchInputHandler = (event) => {
    setSearch(event.currentTarget.value);
    /* console.log(search); */
  };
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.inputContainer}>
        <div className={styles.inputs}>
          <input
            onChange={searchInputHandler}
            placeholder="검색어를 입력하세요"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
