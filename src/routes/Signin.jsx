import React from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleAuth, useLogin } from "../hooks/auth";
import { FaGoogle } from "react-icons/fa";
import "../global.css";

const Signin = () => {
  const { login, isLoading, error } = useLogin();
  const { loginWithGoogle, isLoading: googleLoading, error: googleError } = useGoogleAuth();
  const navigate = useNavigate();

  // Handle the Google login
  const handleGoogleLogin = async () => {
    await loginWithGoogle();

    // Check if the login was successful before redirecting
    if (!googleError) {
      navigate("/home");
    }
  };

  return (
    <div className="signin-page">
      
      <h1 className="label">Glad You Here!</h1>
      <p className="sub-label">Let’s close with the World</p>

      <img className="network-img" src="network.svg"/>

      {/* Submit Button */}
      <button
        onClick={handleGoogleLogin}
        className="google-auth-btn"
        disabled={isLoading}
      >
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <p className="google-auth-btn-txt">Continue with Google</p>
            <FaGoogle className="google-auth-icon" />
          </>
        )}
      </button>
      <p className="btn-sub-label">Explore now on closbe!</p>
    </div>
  );
};

export default Signin;
