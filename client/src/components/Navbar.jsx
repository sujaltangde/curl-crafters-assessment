import { LuLogOut } from "react-icons/lu";

import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { IsLogin } from "../actions/userActions";
import { clearStates } from "../slices/UserSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const Navbar = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const LogOut = async () => {
      dispatch(clearStates())
        await signOut(auth)
        localStorage.removeItem("accessToken")
        toast.success("Logout successful!")
        dispatch(IsLogin())
        navigate("/auth/login")
    }

  return (
    <>
      <div className="flex justify-end md:px-12 px-6 py-4">
        <button onClick={()=>LogOut()} className="text-red-600 font-semibold text-xl flex items-center gap-1  ">
          {" "}
          <LuLogOut size={20} /> <span className="pb-1">Logout</span>{" "}
        </button>
      </div>
    </>
  );
};
