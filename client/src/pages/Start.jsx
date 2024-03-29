import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addQuestions, getQuestions } from "../actions/quizActions";
import { IsLogin } from "../actions/userActions";

export const Start = () => {
  const { loading, isLogin, logUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(addQuestions());
    dispatch(getQuestions());
  }, [navigate]);


  useEffect(()=>{

    dispatch(IsLogin())

  },[navigate])
 

  return (
    <>
      <div className="bg-black text-white  min-h-screen">
        <Navbar />

        <div className="flex flex-col gap-5 justify-start md:mx-72 mx-5 md:pt-16 pt-10">
          <p className="md:text-5xl text-4xl text-white font-bold">
            Welcome to the Quiz
          </p>
          <div>
            <p className="md:text-3xl text-2xl text-green-700 font-semibold">
              Instructions:
            </p>
            <ul className="font-semibold list-disc pl-5">
              <li className="md:text-xl text-lg">
                You can not quit in middle of quiz.
              </li>
              <li className="md:text-xl text-lg">
                You cannot revisit the question.
              </li>
              <li className="md:text-xl text-lg">
                Each question is of 1 minute.
              </li>
              <li className="md:text-xl text-lg">
                There are total 10 question of 1 min each.
              </li>
              <li className="md:text-xl text-lg">
                Total time of quiz is 10 mins and total marks are 50.
              </li>
              <li className="md:text-xl text-lg">
                Each question is of 5 mark, there is no negative marking.
              </li>
              <li className="md:text-xl text-lg">
                You can only vies your score after submitting the quiz.
              </li>
            </ul>
          </div>

          <div className="mt-5">
            {logUser && !logUser.attempted ? (
              <Link
                to="/quiz"
                className="bg-blue-700 font-semibold text-white px-10 py-2"
              >
                Start the Quiz
              </Link>
            ) : (
              <Link
                to="/score"
                className="bg-blue-700 md:text-sm text-xs font-semibold text-white md:px-10 px-3 py-2"
              >
                You already attempted the quiz, Check your score
              </Link>
            )}
          </div>
          
          <div className="mt-5">
            {logUser && logUser.isAdmin && (
              <Link
              to="/admin"
              className="bg-blue-700 font-semibold text-white px-10 py-2"
            >
              Admin panel
            </Link>
            ) }
          </div>
        </div>
      </div>
    </>
  );
};
