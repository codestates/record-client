import React from 'react';
import CardItem from './Card_item';
import styles from '../Card/Card_list.module.css';
const Cardlist = ({ posts, users }) => {
  console.log(posts);
  return (
    <ul className={styles.cardList}>
      {posts &&
        posts
          .slice(0)
          .reverse()
          .map((item) => (
            <CardItem
              key={item.id}
              postData={item}
              userData={users}
              imageUrl={item.imageUrl}
            />
          ))}
    </ul>
  );
};

export default Cardlist;
