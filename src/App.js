import React, { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import SearchContextProvider from "./context/SearchContext";
import Navigation from "./components/navigation/Navigation";
const Home = lazy(() => import("./routes/Home"));
const Profile = lazy(() => import("./routes/Profile"));
const Search = lazy(() => import("./routes/Search"));
const Post = lazy(() => import("./routes/Post"));
const Signin = lazy(() => import("./routes/Signin"));
const UserProfile = lazy(() => import("./routes/UserProfile"));
/*  Loading Animation Component  */
// import AnimationOnLoad from "./components/AnimationOnLoad";

function App() {
  const location = useLocation();

  return (
    <>
      <SearchContextProvider>
        <Navigation />

        <AnimatePresence initial={true}>
          {/* All Routes */}
          <Routes location={location} key={location.pathName}>
            {/* Home */}
            <Route
              path="/home"
              element={
                <Suspense>
                  <Home />
                </Suspense>
              }
            />
            {/* Profile */}
            <Route
              path="/profile"
              element={
                <Suspense>
                  <Profile />
                </Suspense>
              }
            />
            {/* User Profile */}
            <Route
              path="/profile/:id"
              element={
                <Suspense>
                  <UserProfile />
                </Suspense>
              }
            />
            {/* Search */}
            <Route
              path="/search"
              element={
                <Suspense>
                  <Search />
                </Suspense>
              }
            />
            {/* Post */}
            <Route
              path="/post"
              element={
                <Suspense>
                  <Post />
                </Suspense>
              }
            />
            {/* Sign In */}
            <Route
              path="/"
              element={
                <Suspense>
                  <Signin />
                </Suspense>
              }
            />

          </Routes>
        </AnimatePresence>
      </SearchContextProvider>
    </>
  );
}

export default App;
