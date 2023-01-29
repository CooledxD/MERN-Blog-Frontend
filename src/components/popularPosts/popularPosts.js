import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export const PopularPosts = ({ post }) => {
  return (
    <li>
      <Link to={`/post/${post._id}`}>{ post.title }</Link>
    </li>
  )
}

PopularPosts.propTypes = {
  post: PropTypes.object
}