import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getQuestions, setQuestionOption, submitQuiz } from "../actions/quizActions";

export const Quiz = () => {
  const { isLogin } = useSelector((state) => state.user);
  const { loading, allQuestions, selectedOptions } = useSelector((state) => state.quiz);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(60); // 1 minute in seconds
  const [quizTimeLeft, setQuizTimeLeft] = useState(600); // 10 minutes in seconds
  const [selectedOption, setSelectedOption] = useState("") ;

  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
    }
  }, [isLogin]);

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  useEffect(() => {
    const questionInterval = setInterval(() => {
      setQuestionTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(questionInterval);
          moveToNextQuestion();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    const quizInterval = setInterval(() => {
      setQuizTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(questionInterval);
          clearInterval(quizInterval);
          // Handle quiz completion, maybe show a message or redirect
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(questionInterval);
      clearInterval(quizInterval);
    };
  }, [currentQuestionIndex]);

  const moveToNextQuestion = () => {
    setSelectedOption("")
    if(currentQuestionIndex === allQuestions.length - 1){
      setQuestionTimeLeft(0)
    }else{
      if (currentQuestionIndex < allQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setQuestionTimeLeft(60); // Reset time for the next question
      } 
    }
    
  };

  const formatTime = (seconds) => {
    if (seconds <= 0) {
      return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };


  const recordAnswers = (option, queNo) => {
    setSelectedOption(option)
    
    
    let newSelectedOptions = selectedOptions.map(item =>
      item.id === queNo ? { ...item, option: option } : item
      );
      
      dispatch(setQuestionOption(newSelectedOptions))
  }


  const handleQuizSubmit = ()=>{
    console.log(selectedOptions)
    dispatch(submitQuiz(selectedOptions))
  }

  return (
    <>
      <div className="bg-black text-white min-h-screen">
        <Navbar />

        {loading ? (
          "Loading..."
        ) : (
          <>
            {(currentQuestionIndex === allQuestions.length - 1 &&
              questionTimeLeft === 0) ||
            quizTimeLeft === 0 ? (
              <div className="flex justify-center mt-32 items-center">
                <button className="text-3xl font-semibold bg-blue-600 px-12 py-2" onClick={handleQuizSubmit}>Submit Quiz</button>
              </div>
            ) : (
              <div className=" md:mx-72 flex  flex-col  items-center">
                <p className="text-6xl font-semibold  pb-12">
                  {formatTime(quizTimeLeft)}
                </p>

                <div className="w-full">
                  <div className="flex  justify-between items-center gap-2 py-5">
                    <p className="text-2xl font-semibold">
                      Question {currentQuestionIndex + 1}
                    </p>
                    <p className="text-lg font-semibold">
                      Time left for question: {formatTime(questionTimeLeft)}
                    </p>
                  </div>

                  <div>
                    {allQuestions && allQuestions.length > 0 && (
                      <>
                        <div>
                          <p className="text-xl  font-bold">
                            {allQuestions[currentQuestionIndex].question}
                          </p>
                        </div>
                        
                        <div className="py-5 flex flex-col gap-3">

                          <button onClick={()=>recordAnswers("A",currentQuestionIndex+1)} 
                          className={`flex items-center text-left `}>
                            <span className={`text-base bg-gray-800 px-5  py-2 font-semibold 
                           `}>
                              {
                                allQuestions[currentQuestionIndex].options[0]
                                  .label
                              }
                            </span>
                            <span className={`text-base text-black w-full bg-gray-400 px-5 py-2 font-semibold 
                            ${selectedOption === "A" && "bg-blue-400"}`}>
                              {
                                allQuestions[currentQuestionIndex].options[0]
                                  .text
                              }
                            </span>
                          </button>

                          <button onClick={()=>recordAnswers("B",currentQuestionIndex+1)} className="flex items-center text-left ">
                            <span className="text-base bg-gray-800 px-5  py-2 font-semibold ">
                              {
                                allQuestions[currentQuestionIndex].options[1]
                                  .label
                              }
                            </span>
                        <span className={`text-base text-black w-full bg-gray-400 px-5 py-2   font-semibold 
                        ${selectedOption === "B" && "bg-blue-400"}
                        `}>
                              {
                                allQuestions[currentQuestionIndex].options[1]
                                  .text
                              }
                            </span>
                          </button>

                          <button onClick={()=>recordAnswers("C",currentQuestionIndex+1)} className="flex items-center text-left ">
                            <span className="text-base bg-gray-800 px-5  py-2 font-semibold ">
                              {
                                allQuestions[currentQuestionIndex].options[2]
                                  .label
                              }
                            </span>
                            <span className={`text-base text-black w-full bg-gray-400 px-5 py-2   
                            font-semibold ${selectedOption === "C" && "bg-blue-400"}`}>
                              {
                                allQuestions[currentQuestionIndex].options[2]
                                  .text
                              }
                            </span>
                          </button>

                          <button onClick={()=>recordAnswers("D",currentQuestionIndex+1)} className="flex items-center text-left ">
                            <span className="text-base bg-gray-800 px-5  py-2 font-semibold ">
                              {
                                allQuestions[currentQuestionIndex].options[3]
                                  .label
                              }
                            </span>
                            <span className={`text-base text-black w-full bg-gray-400 px-5 py-2   font-semibold ${selectedOption === "D" && "bg-blue-400"}`}>
                              {
                                allQuestions[currentQuestionIndex].options[3]
                                  .text
                              }
                            </span>
                          </button>
                          

                        </div>
                      </>
                    )}
                  </div>

                  <button
                    className="bg-blue-500 px-12 py-1.5 font-semibold text-lg"
                    onClick={moveToNextQuestion}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
