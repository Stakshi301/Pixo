import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../utils/api";
import "./Login.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/MainPage");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name.trim() || !password.trim() || !email.trim()) {
      setError("All fields are required!");
      return;
    }
    setError("");

    try {
      const response = await signIn({ name, email, password });

      console.log("Signup Response:", response); // Debugging log

      if (response?.success) {
        alert("Signup successful! 🎉 Redirecting to login...");
        setTimeout(() => {
          navigate("/MainPage");
        }, 1000);
      } else {
        setError(response?.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSignup}>
        <div className="namepass">
          <input
            type="text"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>} 

        <div className="buttons">
          <button className="submit" type="submit">
            Submit
          </button>
          <button type="button" className="back" onClick={handleBack}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
