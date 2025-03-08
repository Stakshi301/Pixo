import React, { useEffect, useState, useContext } from "react";
import { myPosts, createPost, update, deleted } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PIXO from '../../assets/PIXO.png';
import "./Dashboard.css";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ name: "", image: "" });
  const [editPost, setEditPost] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    //   return;
    }
    fetchUserPosts();
  },[token, navigate]);

  const fetchUserPosts = async () => {
    try {
      const { data } = await myPosts();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    }
  };

  const handleCreate = async () => {
    try {
      await createPost(newPost);
      fetchUserPosts();
      setNewPost({ name: "", image: "" });
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await update(editPost._id, editPost);
      fetchUserPosts();
      setEditPost(null);
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleted(id);
      fetchUserPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };
  

  return (
    <div className="DashboardBody">
    <div className="dashboard">
      <img className="logo" src={PIXO} alt="Pixo-logo" onClick={()=>navigate('/MainPage')}/>
      <h2 className="head">Welcome, {user?.name || "User"}!</h2>

      {/* Create post */}
      <div className="create-post">
        <input
          type="text"
          placeholder="name"
          value={newPost.name}
          onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newPost.image}
          onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
        />
        <button className="createPostbtn" onClick={handleCreate}>Create Post</button>
      </div>

      {/*  posts */}
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post">
              <img src={post.image} alt="Post" />
              {editPost?._id === post._id ? (
                <input
                  type="text"
                  value={editPost.name}
                  onChange={(e) =>
                    setEditPost({ ...editPost, name: e.target.value })
                  }
                />
              ) : (
                <h3>{post.name}</h3>
              )}
              {editPost?._id === post._id ? (
                <button className="saveBtn" onClick={handleUpdate}>Save</button>
              ) : (
                <>
                  <button className="editbtn" onClick={() => setEditPost(post)}>Edit</button>
                  <button className="Delbtn" onClick={() => handleDelete(post._id)}>Delete</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
