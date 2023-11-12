import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { googleProvider, auth } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  //LOGIN WITH GOOGLE
    const loginWithGoogle = async () => {
        try {
        await signInWithPopup(auth, googleProvider);
        } catch (err) {
        console.error("Error with Auth With Google:", err);
        }
    };

  return (
    <div >
        <h1>Login</h1>
        <a onClick={loginWithGoogle} className="social">
            <FaGoogle />
        </a>
    </div>
  );
};

export default Login;
