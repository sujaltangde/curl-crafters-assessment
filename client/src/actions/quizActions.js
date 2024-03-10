import {getAllQuestionsRequest,getAllQuestionsSuccess,getAllQuestionsFail, setQuestionsOption,
    submitQuizRequest,submitQuizSuccess,submitQuizFail} from '../slices/QuizSlice'
import { toast } from "react-toastify";
import axios from "axios";



export const addQuestions = () => async (dispatch) => {
    try{

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }

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

export const submitQuiz = (quizData) => async (dispatch) => {
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

        console.log(data)

        dispatch(submitQuizSuccess())

    }catch(err){
        dispatch(submitQuizFail(err.response.data.message)) ;
    }
    // dispatch(setQuestionsOption(data))
}