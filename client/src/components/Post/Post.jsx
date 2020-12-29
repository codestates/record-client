import styles from '../Post/Post.module.css';

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Preview from './Preview/Preview';

const Post = ({ userData, postData, setPostData }) => {
  let Today = new Date();
  let date = `${Today.getFullYear()}년 ${Today.getMonth()}월 ${Today.getDate()}일`;
  const history = useHistory();
  const [write, setWrite] = useState(false);

  const [postContent, setPostContent] = useState({
    id: 10,
    title: '',
    tag: '',
    contents: '',
    fileUrl: '',
    created_at: date,
    comment: '1개의 댓글',
  });

  const postBtnHandler = () => {
    let post = [...postData];
    post.push(postContent);
    setPostData(post);
    history.push({
      pathname: '/',
    });
  };

  const postContentHandler = (e) => {
    let postData = { ...postContent, [e.target.name]: e.currentTarget.value };
    setPostContent(postData);
  };

  const previweBtnHandler = () => {
    setWrite(true);
  };

  const backBtnHandler = () => {
    history.push({
      pathname: '/',
    });
  };
  return (
    <>
      {write === true ? (
        <Preview
          postContent={postContent}
          setPostContent={setPostContent}
          userData={userData}
          postData={postData}
          setPostData={setPostData}
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
              name="tag"
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
