import React, { useState, useEffect } from "react";
import Navbar from "../NavFoot/Navbar";
import { Footer } from "../NavFoot/Footer";
import "./MainPage.css";
import { fetchProducts , getAllPost } from "../../utils/api"; // Import both APIs

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const predefinedPosts = await fetchProducts ();  // API call to /products
        const userPostsResponse = await getAllPost(); // API call to /post/getAllPost
        const userPosts = userPostsResponse.data; // Extract actual data

        const mergedPosts = [...userPosts, ...predefinedPosts]; // Merge both arrays

        console.log("User Posts:", userPosts); // ✅ Debugging
        console.log("Predefined Posts:", predefinedPosts); // ✅ Debugging
        console.log("Merged Posts:", mergedPosts); // ✅ Debugging

        setPosts(mergedPosts); // Set all posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="main">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="mainContainer">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((item, index) => (
              <div key={index} className="postCard">
                <img src={item.image || item.url} alt="Post" className="images" />
                <h3 className="imageName">{item.name || "Default Image"}</h3>
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
