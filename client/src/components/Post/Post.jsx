import styles from '../Post/Post.module.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Preview from './Preview/Preview';
import axios from 'axios';

const Post = ({ posts, setPosts, accessToken }) => {
  let Today = new Date();
  let date = `${Today.getFullYear()}년 ${Today.getMonth()}월 ${Today.getDate()}일`;
  const history = useHistory();
  const [write, setWrite] = useState(false);

  const previweBtnHandler = () => {
    setWrite(true);
  };

  const backBtnHandler = () => {
    history.push({
      pathname: '/',
    });
  };
  const [postContent, setPostContent] = useState({
    id: '',
    title: '',
    tagNames: '',
    contents: '',
    imageUrl: '',
    createdAt: date,
    comment: '',
  });

  const postBtnHandler = () => {
    let token = accessToken;

    let post = [...posts];
    post.push(postContent);
    setPosts(post);

    const { title, contents, imageUrl, tagNames } = postContent;

    axios.post(
      'http://localhost:4000/posts/create',
      { ...postContent, title, contents, imageUrl, tagNames },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    );

    history.push({
      pathname: '/',
    });
  };

  const postContentHandler = (e) => {
    let postData = { ...postContent, [e.target.name]: e.currentTarget.value };
    setPostContent(postData);
  };

  return (
    <>
      {write === true ? (
        <Preview
          postContent={postContent}
          setPostContent={setPostContent}
          postBtnHandler={postBtnHandler}
        />
      ) : (
        <section className={styles.sectionContainer}>
          <div className={styles.postContainer}>
            <input
              className={styles.titleInput}
              name="title"
              type="text"
              placeholder="제목을 입력하세요"
              onChange={(e) => {
                postContentHandler(e);
              }}
            />
            <div className={styles.line}></div>
            <input
              className={styles.tagInput}
              name="tagNames"
              type="text"
              placeholder="태그를 입력하세요"
              onChange={(e) => {
                postContentHandler(e);
              }}
            />
            <textarea
              className={styles.contentInput}
              name="contents"
              id=""
              placeholder="당신의 이야기를 적어보세요..."
              onChange={(e) => {
                postContentHandler(e);
              }}
            ></textarea>
            <div className={styles.btnContainer}>
              <button className={styles.backBtn} onClick={backBtnHandler}>
                나가기
              </button>
              <button className={styles.writeBtn} onClick={previweBtnHandler}>
                발행
              </button>
            </div>
          </div>
          <div className={styles.viewContainer}>
            <h1>{postContent.title}</h1>
            <div className={styles.contentContainer}>
              {postContent.contents.split('\n').map((content, i) => (
                <p key={i}>{content}</p>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Post;
