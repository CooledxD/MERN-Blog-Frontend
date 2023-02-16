import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

// Store
import { updatePost } from "../../redux/features/post/postSlice.js";

// Utils
import axios from '../../utils/axios.js'

// Styles
import styles from './editPost.module.css'

export const EditPost = () => {
  // Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  // State
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')

  // Getting a post
  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`)

      setTitle(data.title)
      setText(data.text)
      setOldImage(data.image)
    } catch (error) {
      console.log(error)
    }
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  // Update post
  const submitHandler = () => {
    try {
      const updatedPost = new FormData()

      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('image', newImage ? newImage : oldImage)
      updatedPost.append('id', params.id)

      dispatch(updatePost(updatedPost)).then(() => {
        navigate(`/post/${params.id}`)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formAddPost} onSubmit={(event) => event.preventDefault()}>

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
          className={styles.quill} />
        
        {/* Update post */}
        <div className={styles.formAddPost__buttonWrapper}>
          <button onClick={submitHandler}>Save</button>
        </div>
      </form>
    </div>
  )
}