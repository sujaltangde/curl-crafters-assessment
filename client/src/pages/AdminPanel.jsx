import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const AdminPanel = () => {

   const [usersScore, setUserScore] = useState([]) ;
   const { isLogin } = useSelector((state) => state.user);
   const navigate = useNavigate()

   useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
    }
  }, [navigate]);


   useEffect(() => {
    const fetchUserData = async () => {
      try {
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          };
        const response = await axios.get("http://localhost:5000/api/quiz/getScores",config);
        console.log(response.data)
        setUserScore(response.data.scores); 
      } catch (error) {
        console.error("Error fetching user scores:", error);
      
      }
    };

    fetchUserData(); 
  }, []); 

  const formatDate = (str)=>{
    return  str.slice(0,10).split("-")[2] + "/" + str.slice(0,10).split("-")[1] + "/" + str.slice(0,10).split("-")[0]
} 

  return (
    <>
      <div className="min-h-screen pt-12 px-12 bg-black text-white">
        <Navbar/>
       {usersScore.length !== 0 ? <div>
          <div className="relative overflow-x-auto">
            <p className="text-3xl py-5 font-semibold">User Scores</p>
            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
              <thead className="text-xs uppercase bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Submission Date
                  </th>
                </tr>
              </thead>
              <tbody>
               {usersScore.map((e)=>(
                <tr className=" border-b bg-gray-800 border-gray-700">
                  <td
                    scope="row"
                    className="px-6 py-4 "
                  >
                   {e._id}
                  </td>
                  <td className="px-6 py-4">{e.username}</td>
                  <td className="px-6 py-4">{e.score}/{e.maximumScore}</td>
                  <td className="px-6 py-4">{formatDate(e.createdAt)}</td>
                </tr>
               )) }
               
              </tbody>
            </table>
          </div>
        </div> : 
        <p>
            Currently we dont have any data
        </p>
        }
      </div>
    </>
  );
};
