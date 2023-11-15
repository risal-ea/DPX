import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import isUsernameExists from "../utils/isUsernameExists";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../firebase";

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ref = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      setLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false); // Not signed in
    }
  }, [authLoading, authUser]);

  return { user, isLoading, error };
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = "/" }) {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(redirectTo);
    } catch (e) {
      setError(e.message);
      // console.log(error.message);
      setLoading(false);
      return false; // Return false if login failed
    }
    setError("");
    setLoading(false);
    return true; // Return true if login succeeded
  }

  return { login, isLoading, error };
}

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function register({ username, email, password, redirectTo = "/" }) {
    setLoading(true);
    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
      setError("Username already exists");
      setLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username,
          avatar: "",
          date: Date.now(),
        });

        navigate("/");
      } catch (error) {
        setError("Signed up failed");
      } finally {
        setLoading(false);
      }
    }
  }

  return { register, isLoading, error };
}

export function useGoogleAuth() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function loginWithGoogle() {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Check if the user already exists in the database
      const userRef = doc(db, "users", result.user.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        // If the user doesn't exist, add them to the database
        await setDoc(userRef, {
          id: result.user.uid,
          username: result.user.displayName,
          avatar: result.user.photoURL,
          date: Date.now(),
        });
      }
      console.log("user loged in");
      navigate("/");
    } catch (error) {
      setError("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return { loginWithGoogle, isLoading, error };
}

export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const navigate = useNavigate();

  async function logout() {
    if (await signOut()) {
      navigate("/signin");
    } // else show error [signOut() returns false if failed]
  }

  return { logout, isLoading };
}
