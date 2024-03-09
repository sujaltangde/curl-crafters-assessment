import { onAuthStateChanged } from "firebase/auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useEffect, useState } from "react";
import { Start } from "./pages/Start";
import { Quiz } from "./pages/Quiz";
import { auth } from "./config/firebase";

function App() {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  
  return (
    <>
      {/* <Navbar /> */}
      {/* <div className="text-sm">
        {user && JSON.stringify(user.accessToken)}
    </div> */}

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/quiz" element={<Quiz />} />
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
