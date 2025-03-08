import "./Login.css";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleBack=()=>{
        navigate('/MainPage');
    }

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!email.trim() || !password.trim()) {
            setError("All fields are required!");
            return;
        }
    
        setError(""); 
    
        try {
            const response = await login({ email, password }, navigate);
    
            if (!response.success) {
                alert(response.message); 
                return;
            }
            const user = response.user;
            if (user.role === "admin") {
                navigate("/admin-dashboard"); // Redirect admin
            } else {
                navigate("/dashboard"); // Redirect normal users
            }
    
        } catch (error) {
            console.error("Login failed:", error);
            alert(error.response?.data?.message || "Something went wrong!"); 
        }
    };
    

    return (
        <>
        <div className="container">
            <form onSubmit={handleLogin}>
                <div className="namepass">
                    <input
                        type="text"
                        value={email}
                        placeholder="Enter email..."
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter password..."
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="buttons">
                    <button type="submit" className="submit">Login</button>
                    <button type="button" className="back" onClick={handleBack}>Back</button>
                </div>

                <p>Don't have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/Signup")}>Sign Up</span></p>
            </form>
        </div>
        </>
    );
};

export default Login;
