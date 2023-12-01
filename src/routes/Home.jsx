import React, { useEffect } from "react";
import { usePosts } from "../hooks/posts";
import Posts from "../components/posts/Posts";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { posts, isLoading: postsLoading } = usePosts();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Log the entire user object
  console.log("user object:", user);
  // Log the user id
  console.log("user id:", user?.id);

  useEffect(() => {
    // Log the auth loading status
    console.log("authLoading:", authLoading);

    // Check if the user is not available, then navigate to "/signin"
    if (!user?.id && !authLoading) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  // Render Posts component only if the user is authenticated
  return user?.id ? <Posts posts={posts} isLoading={postsLoading} /> : null;
};

export default Home;
