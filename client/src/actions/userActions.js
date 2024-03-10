import {
  loginRequest,
  loginSuccess,
  loginFail,
  registerRequest,
  registerSuccess,
  registerFail,
  isLoginRequest,
  isLoginSuccess,
  isLoginFail,
  getLogUser,
} from "../slices/UserSlice";
import { toast } from "react-toastify";
import axios from "axios";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const user = await signInWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    if (user) {
      console.log(user.user.accessToken);
    }

    const { data } = await axios.post(
      "http://localhost:5000/api/login",
      userData
    );

    dispatch(IsLogin());
    dispatch(loginSuccess());
    localStorage.setItem("accessToken", user.user.accessToken);
    toast.success("Login Successful !");
  } catch (err) {
    dispatch(loginFail(err.message));
    if (err.message.includes("invalid-credential")) {
      toast.error("Invalid credentials");
    } else {
      toast.error(err.message);
    }
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const user = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const { data } = await axios.post(
      "http://localhost:5000/api/register",
      userData
    );

    dispatch(IsLogin());
    dispatch(registerSuccess());
    localStorage.setItem("accessToken", user.user.accessToken);
    toast.success("Register Successful !");
  } catch (err) {
    dispatch(registerFail(err.message));
    if (err.message.includes("email-already-in-use")) {
      toast.error("User already exists!");
    } else {
      toast.error(err.message);
    }
  }
};

export const IsLogin = () => async (dispatch) => {
  try {
    dispatch(isLoginRequest());

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:5000/api/isLogin",
      config
    );

    dispatch(getLogUser(data.user));
    dispatch(isLoginSuccess(data));
  } catch (err) {
    dispatch(isLoginFail(err.message));
  }
};
