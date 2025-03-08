import { createContext, useState, useEffect } from "react";
import { logIn } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (userModel, navigate) => {
    try {
      const response = await logIn(userModel);
      console.log("Login API Response:", response);

      if (response.success) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        if (response.message === "User not found! Please sign up.") {
          alert("User does not exist. Redirecting to Signup...");
          navigate("/signup"); // Redirect to signup page
        }
      }
      return response;
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
