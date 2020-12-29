import React from 'react';
import styles from '../Preview/Preview.module.css';
const Preview = ({ postContent, postBtnHandler, setPostContent }) => {
  const fileUploadHanlder = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.currentTarget.files[0];
    reader.onloadend = () => {
      let postImg = { ...postContent, [e.target.name]: reader.result };
      setPostContent(postImg);
    };
    reader.readAsDataURL(file);
  };

  const fileRemoveHandler = (e) => {
    let postImg = { ...postContent, fileUrl: '' };
    setPostContent(postImg);
  };
  return (
    <section className={styles.previewContainer}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <h1 className={styles.previewTitle}>포스트 미리보기</h1>
          <button className={styles.imgUpload}>
            <label htmlFor="file" className={styles.label}>
              <input
                className={styles.labelInput}
                id="file"
                name="fileUrl"
                type="file"
                accept=".jpg, .png, .jpeg, .gif"
                onChange={(e) => {
                  fileUploadHanlder(e);
                }}
              />
              이미지 업로드
            </label>
          </button>
          <button
            className={styles.imgRemove}
            onClick={(e) => {
              fileRemoveHandler(e);
            }}
          >
            이미지 제거
          </button>
          <div className={styles.imgContainer}>
            {postContent.fileUrl == '' ? (
              <svg width="107" height="85" fill="none" viewBox="0 0 107 85">
                <path
                  fill="#868E96"
                  d="M105.155 0H1.845A1.844 1.844 0 0 0 0 1.845v81.172c0 1.02.826 1.845 1.845 1.845h103.31A1.844 1.844 0 0 0 107 83.017V1.845C107 .825 106.174 0 105.155 0zm-1.845 81.172H3.69V3.69h99.62v77.482z"
                ></path>
                <path
                  fill="#868E96"
                  d="M29.517 40.84c5.666 0 10.274-4.608 10.274-10.271 0-5.668-4.608-10.276-10.274-10.276-5.665 0-10.274 4.608-10.274 10.274 0 5.665 4.609 10.274 10.274 10.274zm0-16.857a6.593 6.593 0 0 1 6.584 6.584 6.593 6.593 0 0 1-6.584 6.584 6.591 6.591 0 0 1-6.584-6.582c0-3.629 2.954-6.586 6.584-6.586zM12.914 73.793a1.84 1.84 0 0 0 1.217-.46l30.095-26.495 19.005 19.004a1.843 1.843 0 0 0 2.609 0 1.843 1.843 0 0 0 0-2.609l-8.868-8.868 16.937-18.548 20.775 19.044a1.846 1.846 0 0 0 2.492-2.72L75.038 31.846a1.902 1.902 0 0 0-1.328-.483c-.489.022-.95.238-1.28.6L54.36 51.752l-8.75-8.75a1.847 1.847 0 0 0-2.523-.081l-31.394 27.64a1.845 1.845 0 0 0 1.22 3.231z"
                ></path>
              </svg>
            ) : (
              <img
                src={postContent.fileUrl}
                alt=""
                className={styles.previewImg}
              />
            )}
          </div>
          <h1 className={styles.postTitle}>{postContent.title}</h1>
          <textarea
            className={styles.postContent}
            defaultValue={postContent.contents}
            readOnly={true}
          ></textarea>
          <div className={styles.postBtns}>
            <button className={styles.backBtn}>뒤로가기</button>
            <button className={styles.postBtn} onClick={postBtnHandler}>
              출간하기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Preview;
