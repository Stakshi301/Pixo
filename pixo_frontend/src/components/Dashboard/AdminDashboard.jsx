import React, { useState, useEffect } from "react";
import { fetchAllPosts, deletePost } from "../../utils/api";
import "./AdminDashboard.css";
import PIXO from '../../assets/PIXO.png';
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
    const [posts, setPosts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User from localStorage:", user); // ✅ Debug user data

    const isAdmin = user?.role === "admin";
    console.log("Is Admin:", isAdmin); // ✅ Check if admin
 const navigate=useNavigate();
    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetchAllPosts();
                console.log("Fetched Posts:", response.data); // ✅ Log fetched posts
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        if (isAdmin) getPosts();
    }, [isAdmin]);

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);
            setPosts(posts.filter((post) => post._id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="AdminContainer">
        <div className="adminDashboard">
                  <img className="logoAdmin" src={PIXO} alt="Pixo-logo" onClick={()=>navigate('/MainPage')}/>
            <h2 className="headAdmin">Admin Dashboard</h2>
            <div className="posts-container">
                {posts.map((post) => (
                    <div key={post._id} className="postCard">
                        <img src={post.image || post.url} alt="Post" className="imagesAdmin" />
                        <h3>{post.name || "Default Image"}</h3>
                        <button className="deleteBtn" onClick={() => handleDelete(post._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default AdminDashboard;
