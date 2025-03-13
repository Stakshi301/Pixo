import React, { useState, useEffect } from "react";
import Navbar from "../NavFoot/Navbar";
import { Footer } from "../NavFoot/Footer";
import "./MainPage.css";
import { fetchProducts , getAllPost } from "../../utils/api"; // import both apis

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const predefinedPosts = await fetchProducts ();  
        const userPostsResponse = await getAllPost(); 
        const userPosts = userPostsResponse.data; 

        const mergedPosts = [...userPosts, ...predefinedPosts]; // merge arr

        console.log("User Posts:", userPosts); 
        console.log("Predefined Posts:", predefinedPosts);
        console.log("Merged Posts:", mergedPosts); 

        setPosts(mergedPosts); // set all posts
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
            <p>Loading...</p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
