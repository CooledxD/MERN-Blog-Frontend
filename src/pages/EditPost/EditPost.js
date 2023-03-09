import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

// Component
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage.js";

// Store
import { updatePost } from "../../store/features/post/postSlice.js";

// Utils
import axios from '../../utils/axios.js'
import { validationUpdatePost } from '../../utils/validation/validationUpdatePost.js'

// Styles
import styles from './editPost.module.css'

export const EditPost = () => {
  // Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { postId } = useParams()

  // State
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')
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

  // Getting a post
  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${postId}`)

      setTitle(data.title)
      setText(data.text)
      setOldImage(data.image)
    } catch (error) {
      console.log(error)
    }
  }, [postId])

  // Update post
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      // Validation
      await validationUpdatePost({
        title: title,
        text: text,
        image: newImage
      })
      
      // Create post
      const updatedPost = new FormData()

      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('image', newImage ? newImage : oldImage)

      dispatch(updatePost({updatedPost, postId})).unwrap()
        .then(() => {
          navigate(`/post/${postId}`)
        })
        .catch((error) => {
          setMessage(error.message)
        })
    } catch (error) {
      setMessage(error.message)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formAddPost} onSubmit={handleSubmit}>

        {/* Message */}
        {message && <ErrorMessage message={message} />}

        {/* Update image */}
        <label className={styles.fromAddPost__input}>
          Attach an image
          <input
            onChange={(event) => {
              setNewImage(event.target.files[0])
              setOldImage('')
            }}
            type="file"
            hidden />
        </label>

        {/* Image display */}
        {
          oldImage && (
            <img className={styles.formAddPost__image} src={`${process.env.HOST}/${oldImage}`} alt="post image" />
          )
        }
        {
          newImage && (
            <img className={styles.formAddPost__image} src={URL.createObjectURL(newImage)} alt="post image" />
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
          value={text}
          onChange={setText}
          className={styles.quill}
          modules={modules}
          placeholder={'Content goes here...'}
        />
        
        {/* Update post */}
        <div className={styles.formAddPost__buttonWrapper}>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  )
}