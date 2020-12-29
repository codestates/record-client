import React from 'react';
import CardItem from './Card_item';
import styles from '../Card/Card_list.module.css';
import { useHistory } from 'react-router-dom';
const Cardlist = ({ userData, postData }) => {
  const history = useHistory();
  const cardClickHandler = () => {
    history.push({
      pathname: '/detail',
    });
  };
  return (
    <ul className={styles.cardList} onClick={cardClickHandler}>
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
