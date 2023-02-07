import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

import { createPost } from "../../redux/features/post/postSlice.js";
import styles from './addPost.module.css'

export const AddPost = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = () => {
    try {
      const post = new FormData()

      post.append('title', title)
      post.append('text', text)
      post.append('image', image)

      dispatch(createPost(post)).then(() => {
        navigate('/posts')
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formAddPost} onSubmit={(event) => event.preventDefault()}>
        <label className={styles.fromAddPost__input}>
          Прикрепить изображение
          <input 
            onChange={(event) => setImage(event.target.files[0])} 
            type="file" 
            hidden/>
        </label>
        { 
          image && (
            <img className={styles.formAddPost__image} src={URL.createObjectURL(image)} alt="post image" />
          )
        }

        <input 
          className={styles.fromAddPost__input} 
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text" 
          placeholder="Заголовок поста" />
        <ReactQuill 
          theme='snow' 
          value={text} 
          onChange={setText}
          className={styles.quill} />
        {/* <textarea 
          className={styles.fromAddPost__textarea} 
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder='Текс поста' /> */}
        <div>
          <button onClick={submitHandler}>Добавить</button>
        </div>
      </form>
    </div>
  )
}