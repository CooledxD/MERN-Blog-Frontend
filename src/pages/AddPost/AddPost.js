import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Store
import { createPost } from "../../store/features/post/postSlice.js";
import { addPostUserState } from "../../store/features/user/userSlice.js";

// Component
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage.js";

// Utils
import { validationCreatePost } from "../../utils/validation/validationCreatePost.js";

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
  const [message, setMessage] = useState('')

  // Quill options
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],

      [{ 'header': [1, 2, 3, false] }, { 'font': [] }],

      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],

      [{ 'color': [] }, { 'background': [] }],

      ['link', 'image'],

      ['clean']
    ],
  }
  
  // Create post
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      // Validation
      await validationCreatePost({
        title: title,
        text: text,
        image: image
      })

      // Create formData
      const post = new FormData()

      post.append('title', title)
      post.append('text', text)
      post.append('image', image)

      // Create post
      dispatch(createPost(post)).unwrap()
        .then((payload) => {

          dispatch(addPostUserState(payload.newPost._id))

          navigate('/user/posts')
        })
        .catch((error) => {
          setMessage(error.message)
        })
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formAddPost} onSubmit={handleSubmit}>

        {/* Message */}
        {message && <ErrorMessage message={message} />}

        {/* Image */}
        <label className={styles.fromAddPost__input}>
          Attach an image
          <input
            onChange={(event) => setImage(event.target.files[0])}
            type="file"
            hidden />
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
          theme="snow"
          className={styles.quill}
          value={text}
          onChange={setText}
          modules={modules}
          placeholder={'Content goes here...'}
        />

        {/* Create post */}
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}