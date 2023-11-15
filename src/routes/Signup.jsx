import React from "react";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRegister, useGoogleAuth } from "../hooks/auth"; // Import the useGoogleAuth hook
import { FaGoogle } from "react-icons/fa";
import "../global.css";

const Signup = () => {
  // Register user hook
  const { register: signup, isLoading, error } = useRegister();

  // Google authentication hook
  const { loginWithGoogle, isLoading: googleLoading, error: googleError } = useGoogleAuth();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Handle registration form submission
  async function handleRegister(data) {
    const succeeded = await signup({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: "/",
    });

    if (succeeded) reset();
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="w-full max-w-[350px] h-screen m-auto p-4 flex flex-col justify-center bg-white text-black"
    >

      {/** Google sign-in button*/}
      <button onClick={loginWithGoogle} className="button-icon">
        <FaGoogle />
      </button>

      {googleLoading && <p className="text-neutral-600 mt-2">Signing in with Google...</p>}
      {googleError && <p className="text-[#BF0000] mt-2">{googleError}</p>}

      {/* Sign In link */}
      <div className="my-4 text-center tracking-wider">
        <span className="text-neutral-600 pr-2">Already have an account?</span>
        <Link
          to="/signin"
          className="hover:opacity-50 font-bold duration-300 ease-in-out"
        >
          Sign In
        </Link>
      </div>
    </m.div>
  );
};

export default Signup;
