import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './forms.css';

const PostCreate = () => {
  const [post, setPost] = useState({
    username: '',
    content: '',
    picture: '',
  });
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/posts', post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleCreate} className='form'>
        <h2>Create Post</h2>
        <input
          type='text'
          placeholder='Username'
          name='username'
          value={post.username}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          placeholder='Content'
          name='content'
          value={post.content}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          placeholder='Picture'
          name='picture'
          value={post.picture}
          onChange={handleChange}
          required
        />
        <button type='submit'>Create Post</button>
      </form>
    </div>
  );
};

export default PostCreate;