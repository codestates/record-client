import React from 'react';
import styles from '../Card/Card_item.module.css';
import { useHistory } from 'react-router-dom';
const CardItem = ({ postData, userData, imageUrl }) => {
  let createdAt = `${postData.createdAt.split('-')[0]}년 ${
    postData.createdAt.split('-')[1]
  }월`;
  const history = useHistory();
  const detatilHandler = (id) => {
    history.push({
      pathname: '/detail/' + id,
    });
  };
  return (
    <li className={styles.container}>
      <div
        className={styles.card}
        onClick={() => {
          detatilHandler(postData.id);
        }}
      >
        {postData.imageUrl === '' ? null : (
          <img className={styles.thumnail} src={imageUrl} alt="" />
        )}
        <div className={styles.contentBox}>
          <p className={styles.title}>{postData.title}</p>
          <p className={styles.desc}>{postData.contents}</p>
          <span className={styles.date}>{createdAt}</span>
        </div>
        <div className={styles.footer}>
          {userData.map((user) => {
            let users;
            if (user.id === postData.userId) {
              users = (
                <div key={user.id}>
                  <img
                    className={styles.userImg}
                    src={user.profileUrl}
                    alt=""
                  />
                  <span className={styles.userId}>
                    by <b>{user.username}</b>
                  </span>
                </div>
              );
            }
            return users;
          })}
        </div>
        <svg
          className={styles.likeBtn}
          width="14"
          height="14"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
          ></path>
        </svg>
        <p className={styles.like}></p>
      </div>
    </li>
  );
};
export default CardItem;
