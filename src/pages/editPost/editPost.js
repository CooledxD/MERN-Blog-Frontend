import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

import { updatePost } from "../../redux/features/post/postSlice.js";
import axios from '../../utils/axios.js'
import styles from './editPost.module.css'
import { useCallback } from "react";

export const EditPost = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

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
        <label className={styles.fromAddPost__input}>
          Прикрепить изображение
          <input
            onChange={(event) => {
              setNewImage(event.target.files[0])
              setOldImage('')
            }}
            type="file"
            hidden />
        </label>
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
        <div className={styles.formAddPost__buttonWrapper}>
          <button onClick={submitHandler}>Сохранить</button>
        </div>
      </form>
    </div>
  )
}