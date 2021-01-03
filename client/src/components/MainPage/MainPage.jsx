import React, { useEffect, useState } from 'react';
import LogoutModal from '../Modal/LogoutModal'
import PostList from './PostList'
import styles from '../MainPage/MainPage.module.css'
import axios from 'axios';

const MainPage = ({ isModalShow, myData, accessToken, modalOff, clearToken, setLogout }) => {
    const [postData, setPostData] = useState([])
    useEffect(() => {
      axios.
        get('http://localhost:4000/post/user/read', {
          headers: {
            authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        })
        .then(res => {
          if (res.status === 400) {
            console.log(res.message)
          }else if (res.status === 404) {
            console.log(res.message)
          }else {
            setPostData([...res.data.postData]) 
            console.log(res)
          }  //배열객체(객체의 키-id,title,contents,imageUrl,userId,like,created_at,updated_at)
        })
        .catch(err => console.log(err))   
    }, [postData])
    const listItems = postData.map(post => <PostList post={post}/>)
    return (
        <div className={styles.mainContainer}>
          <section className={styles.profile}>
            <div>
              <img className={styles.pic} src="images/empty-profile.png" />
            </div>
            <div className={styles.userInfo}>
              <h2>유저이름</h2>
              <div className={styles.description}>introduce</div>
            </div>
          </section>
          <hr />
          <section className={styles.postList}>
            {listItems}
            <PostList />
          </section>

        {isModalShow && <LogoutModal modalOff={modalOff} clearToken={clearToken} setLogout={setLogout} accessToken={accessToken}/>}
        </div>
    );
};

export default MainPage;
//메인 페이지에서 필요한 데이터
  //유저이름
  //유저 introduce
  //유저와 관련된 그 유저와 관련된 post 데이터