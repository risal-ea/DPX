import React from "react";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { emailValidate, passwordValidate } from "../utils/form-validate";
import { useGoogleAuth, useLogin } from "../hooks/auth";
import "../global.css";

const Signin = () => {
  const { login, isLoading, error } = useLogin();
  const { loginWithGoogle, isLoading: googleLoading, error: googleError } = useGoogleAuth();

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="w-full max-w-[350px] h-screen m-auto p-4 flex flex-col justify-center bg-white text-black"
    >
      {/* Logo */}
      <Link
        to={'/'}
        title="Home"
        className="group text-5xl font-bold mb-12 text-center tracking-widest"
      >
        <span className="group-hover:text-orange-600 duration-150 ease-in">
          C
        </span>
        <span className="group-hover:text-orange-600 duration-150 delay-100 ease-in">
          L
        </span>
        <span className="group-hover:text-orange-600 duration-150 delay-200 ease-in">
          O
        </span>
        <span className="group-hover:text-orange-600 duration-150 delay-[300ms] ease-in">
          S
        </span>
        <span className="group-hover:text-orange-600 duration-150 delay-[400ms] ease-in">
          B
        </span>
        <span className="group-hover:text-orange-600 duration-150 delay-[500ms] ease-in">
          E
        </span>
      </Link>

      {/* Title */}
      <h1
        className={`${
          error ? "text-[#BF0000]" : "text-black"
        } text-left tracking-wider pt-8 pb-2`}
      >
        Join now and stay connected with friends!
      </h1>

      

        {/* Submit Button */}
        <button onClick={loginWithGoogle} className="w-full my-2 p-3 bg-white hover:bg-orange-600 border-2 border-black hover:border-orange-600 text-black hover:text-white tracking-wider rounded-2xl shadow-none hover:shadow-md shadow-orange-600 font-bold duration-300 ease-in-out">
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            <di className="google-auth-btn">
              <p className="google-auth-btn-txt">Continue with Google</p>
              <img width="8%" src="google.svg"/>
            </di>
          )}
        </button>
    </m.div>
  );
};

export default Signin;
