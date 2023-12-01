import React from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { googleProvider, auth } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  // LOGIN WITH GOOGLE
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={loginWithGoogle} className="social-button">
        <FaGoogle />
        Login with Google
      </button>
    </div>
  );
};

export default Login;
