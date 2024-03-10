import {getAllQuestionsRequest,getAllQuestionsSuccess,getAllQuestionsFail, setQuestionsOption,
    submitQuizRequest,submitQuizSuccess,submitQuizFail,
    getScoreRequest,
    getScoreSuccess,
    getScoreFail} from '../slices/QuizSlice'
import { toast } from "react-toastify";
import axios from "axios";





export const addQuestions = () => async (dispatch) => {
    try{

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }   

        const d = ""

        const {data} = await axios.get("http://localhost:5000/api/quiz/addQuestions",config) ;

        console.log(data)

       

    }catch(err){
        console.log(err.message)
    }
}

export const getQuestions = () => async (dispatch) => {
    try{
        dispatch(getAllQuestionsRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }

        const {data} = await axios.get("http://localhost:5000/api/quiz/getQuestions",config) ;

        console.log(data)

        dispatch(getAllQuestionsSuccess(data.questions))

    }catch(err){
        dispatch(getAllQuestionsFail(err.response.data.message)) ;
    }
}


export const setQuestionOption = (data) => async (dispatch) => {
    dispatch(setQuestionsOption(data))
}

export const submitQuiz = (navigate,quizData) => async (dispatch) => {
    // console.log(quizData)
    try{
        dispatch(submitQuizRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }

        const {data} = await axios.post("http://localhost:5000/api/quiz/submit",{
            options:quizData
        },config) ;

        dispatch(submitQuizSuccess())
        dispatch(getScoreSuccess(data.submittedScore))
        toast.success(data.message)
        navigate("/score")

    }catch(err){
        dispatch(submitQuizFail(err.response.data.message)) ;
    }
    // dispatch(setQuestionsOption(data))
}


export const getScore = () => async (dispatch) => {
    try{
        dispatch(getScoreRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }

        const {data} = await axios.get("http://localhost:5000/api/quiz/getScore",config) ;

        console.log(data)

        dispatch(getScoreSuccess(data.score))

    }catch(err){
        dispatch(getScoreFail(err.response.data.message)) ;
    }
}