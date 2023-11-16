import React, { useEffect } from "react";
import { usePosts } from "../hooks/posts";
import Posts from "../components/posts/Posts";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { posts, isLoading: postsLoading } = usePosts();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  console.log("user object:", user); // Log the entire user object
  console.log("user id:", user?.id);

  useEffect(() => {
    console.log("authLoading:", authLoading); // Log the auth loading status

    // Check if the user is not available, then navigate to "/signin"
    if (!user?.id && !authLoading) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  if (user?.id) {
    return <Posts posts={posts} isLoading={postsLoading} />;
  } else {
    return null;
  }
};

export default Home;
