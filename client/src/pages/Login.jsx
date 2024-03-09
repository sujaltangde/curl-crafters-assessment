import React, { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
  } from "firebase/auth";
import { auth } from "../config/firebase";


export const Login = () => {
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState();


  const navigate = useNavigate() ;

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      navigate("/");
    }
  }, [user]);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      // console.log(userData);
      console.log(user);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="bg-black min-h-screen">
        <div className="flex pt-36 justify-center items-center">
          <form className="flex md:w-1/4 flex-col gap-5" onSubmit={handleLogin}>
            <p className="text-4xl text-white font-bold">Login</p>
    
            <input
              onChange={(e) => {
                setUserData({
                  ...userData,
                  email: e.target.value,
                });
              }}
              className="px-4 placeholder-gray-600 outline-none py-2 "
              required
              type="email"
              name="email"
              placeholder="Enter your email"
            />

            <input
              onChange={(e) => {
                setUserData({
                  ...userData,
                  password: e.target.value,
                });
              }}
              required
              className="px-4 placeholder-gray-600  outline-none py-2 "
              type="password"
              name="password"
              placeholder="Enter your password"
            />

            <button
              className="bg-blue-700 font-semibold text-white px-10 py-2"
              type="submit"
            >
              Login
            </button>
            <p className="text-white">Don't have an account <Link to="/auth/register" className="text-blue-500 underline">register</Link> here.</p>
          </form>
        </div>
      </div>
    </>
  );
};





