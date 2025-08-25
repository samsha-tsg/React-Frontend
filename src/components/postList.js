import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Post = ({ post, deletePost }) => (
  <tr>
    <td>{post.user}</td>
    <td>{post.caption}</td>
    <td>
      {post.image && (
        <img
          src={`data:image/jpeg;base64,${post.image}`}
          alt={post.caption}
          style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "cover" }}
        />
      )}
    </td>
    <td>
      <Link to={`/edit/${post._id}`} className="btn btn-primary">Edit</Link>
      <button
        className="btn btn-danger"
        style={{ marginLeft: "10px" }}
        onClick={() => deletePost(post._id)}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function PostList() {
  const [posts, setPosts] = useState([]);

  // Fetch posts
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch("http://localhost:5000/post/"); // ✅ change to backend port

        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        window.alert(error.message);
      }
    }
    getPosts();
  }, []); // ✅ only run once, not on posts.length

  // Delete post
  async function deletePost(id) {
    const token = localStorage.getItem("jwt");
    await fetch(`http://localhost:5000/post/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPosts(posts.filter((post) => post._id !== id));
  }

  return (
    <div className="container">
      <h3>APDS Notice Board</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Caption</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <Post key={post._id} post={post} deletePost={deletePost} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
