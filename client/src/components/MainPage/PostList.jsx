import React, { useState, useEffect } from 'react';
import styles from '../MainPage/PostList.module.css'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const PostList = ({ post }) => {
    const [tags, setTags] = useState([])
    const [comments, setComments] = useState([])
/*     useEffect(() => {
      axios
        .get(`http://localhost:4000/posts/${post.id}/tags/read`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        })
        .then(res =>{
          if (res.status === 400) {
            console.log('insufficient parameter supplied')
          }else if (res.status === 404) {
            console.log('not found post!')
          }else {
            setTags([...res.data.tagsData])
          }
        })
    }, []) */

    const detailHandler = (id) => {
      history.pushState({
        pathname: '/detail/' + id
      })
    }
    return (
        <div className={styles.container}>
          <h2 className={styles.title} onClick={() => {detailHandler(post.id)}}>타이틀</h2>  {/* {post.title} */}
          <div className={styles.content}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus accusantium, obcaecati ab nostrum 
            optio debitis consequuntur voluptas sit sequi iste non amet ratione dignissimos vitae sint? Odit commodi
            corporis id.
          </div> {/* {post.content.substring(0, 151)} */}
          <div className={styles.tag}> </div> {/* {tags.length > 0 ? tags.forEach(tag => tag) : null} */}
          <div className={styles.date}>2021일 1월 1일 / 2개의 댓글</div> {/* {post.created_at} */}
          <hr />
          
        </div>
    );
};

export default PostList;

//보여줘야할 요소들
  //title
  //content
  //날짜
  //댓글 갯수는 어떻게 렌더링?