import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useEffect, useState } from "react";
import { Start } from "./pages/Start";
import { Quiz } from "./pages/Quiz";
import { IsLogin } from "./actions/userActions";
import { useDispatch } from "react-redux";
import { Score } from "./pages/Score";
import { AdminPanel } from "./pages/AdminPanel";

function App() {
  

  const dispatch = useDispatch();

  useEffect(() => {
    const LogOrNot = () => {
      dispatch(IsLogin());
    };
    LogOrNot();
  }, []);

  return (
    <>
    

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/quiz" element={<Quiz/>} />
        <Route path="/score" element={<Score />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-14 font-bold  "
      />
    </>
  );
}

export default App;
