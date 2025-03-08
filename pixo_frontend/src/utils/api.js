import axios from 'axios';
 
const API = axios.create({
  baseURL: "http://127.0.0.1:5000",
  withCredentials: true,
});

API.interceptors.request.use((req)=>{
const token=localStorage.getItem('token');
if(token)req.headers.Authorization=`Bearer ${token}`;
return req;
});


// SIGNUP: Register user
export const signIn = async (userModel) => {
    const { data } = await API.post("/login-signin/signIn", userModel);
    return data;
  };
  
  // LOGIN: Authenticate user
  export const logIn = async (userModel) => {
    console.log("Logging in with:", userModel); // ✅ Debugging
    
    try {
      const { data } = await API.post("/login-signin/logIn", userModel);
      
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
  
      return data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message); // ✅ More detailed error log
      throw error;
    }
  };

  

// Logout: Clear user session
export const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };


  export const fetchPosts = async () => {
    try {
      const response = await API.get("/products"); 
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };


  export const fetchProducts = async () => {
    try {
        const response = await API.get("/products"); 
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


  //admin 
  export const fetchAllPosts = async () => {
    return await axios.get("http://127.0.0.1:5000/post/getAllPost", { withCredentials: true });
};


//delete admin
export const deletePost = async (postId) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage

  try {
      const response = await axios.delete(
          `http://127.0.0.1:5000/post/delete/${postId}`, 
          {
              headers: {
                  Authorization: `Bearer ${token}`, // Add the token to the request header
              },
              withCredentials: true, // This is useful if you are using cookies as well
          }
      );
      return response.data; // Return the response from the server
  } catch (error) {
      console.error("Error deleting post:", error.response?.data || error.message);
      throw error;
  }
};

  
export const createPost=(postModel)=>API.post('/post/createPost',postModel);
export const getAllPost=()=>API.get('/post/getAllPost');
export const myPosts=()=>API.get('/post/my-posts');
export const update=(id,updatedPost)=>API.put(`/post/update/${id}`,updatedPost);
export const deleted=(id)=>API.delete(`/post/delete/${id}`);
export const apiImages=()=>API.get('/products');
    