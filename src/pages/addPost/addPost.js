import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

// Store
import { createPost } from "../../redux/features/post/postSlice.js";
import { addPostUserState } from "../../redux/features/user/userSlice.js";

// Styles
import styles from './addPost.module.css'

export const AddPost = () => {
  // Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // State
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      [{'size': [false, 'large', 'huge']}],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', 'code'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean'],
    ],
  }

  // Create post
  const submitHandler = () => {
    try {
      const post = new FormData()

      post.append('title', title)
      post.append('text', text)
      post.append('image', image)

      dispatch(createPost(post)).then((res) => {
        dispatch(addPostUserState(res.payload.newPost._id))
        navigate('/posts')
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formAddPost} onSubmit={(event) => event.preventDefault()}>

        {/* Image */}
        <label className={styles.fromAddPost__input}>
          Прикрепить изображение
          <input 
            onChange={(event) => setImage(event.target.files[0])} 
            type="file" 
            hidden/>
        </label>

        {/* Image display */}
        { 
          image && (
            <img className={styles.formAddPost__image} src={URL.createObjectURL(image)} alt="post image" />
          )
        }

        {/* Title */}
        <input 
          className={styles.fromAddPost__input} 
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text" 
          placeholder="Заголовок поста" />

        {/* Text */}
        <ReactQuill 
          theme='snow' 
          modules={modules}
          value={text} 
          onChange={setText}
          className={styles.quill} />

        {/* Create post */}
        <div>
          <button onClick={submitHandler}>Добавить</button>
        </div>
      </form>
    </div>
  )
}