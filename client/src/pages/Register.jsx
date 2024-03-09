import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const Register = () => {
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    if (user) {
      navigate("/");
    }
  }, [user]);

  

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const user = await createUserWithEmailAndPassword(
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
        <div className="flex pt-32 justify-center items-center">
          <form
            className="flex md:w-1/4 flex-col gap-5"
            onSubmit={handleRegister}
          >
            <p className="text-4xl text-white font-bold">Register </p>

            <input
              onChange={(e) => {
                setUserData({
                  ...userData,
                  username: e.target.value,
                });
              }}
              className="px-4 placeholder-gray-600 outline-none py-2 "
              required
              type="text"
              name="username"
              placeholder="Create new username"
            />
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
              placeholder="Create new password"
            />

            <button
              className="bg-blue-700 font-semibold text-white px-10 py-2"
              type="submit"
            >
              Register
            </button>

            <p className="text-white">
              Already have a account{" "}
              <Link to="/auth/login" className="text-blue-500 underline">
                login{" "}
              </Link>{" "}
              here.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
