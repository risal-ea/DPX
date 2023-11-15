import React, { useEffect } from "react";
import { usePosts } from "../hooks/posts";
import Posts from "../components/posts/Posts";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { posts, isLoading: postsLoading } = usePosts();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  console.log("user id:", user?.id);

  useEffect(() => {
    // Check if the user is not available, then navigate to "/signin"
    if (!user?.id && !authLoading) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (user?.id) {
    return <Posts posts={posts} isLoading={postsLoading} />;
  } else {
    // Render nothing or a loading indicator while redirecting
    return null;
  }

};

export default Home;
