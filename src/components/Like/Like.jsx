/* eslint-disable react/prop-types */
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import './styles.css';

function Like({ liked, onLike }) {
  return (
    <button className="like" type="button" onClick={onLike}>
      {liked ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

export default Like;
