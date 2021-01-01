import React from 'react';
import CardItem from './Card_item';
import styles from '../Card/Card_list.module.css';
const Cardlist = ({ userData, postData }) => {
  return (
    <ul className={styles.cardList}>
      {postData
        .slice(0)
        .reverse()
        .map((item) => (
          <CardItem key={item.id} postData={item} userData={userData} />
        ))}
    </ul>
  );
};

export default Cardlist;
