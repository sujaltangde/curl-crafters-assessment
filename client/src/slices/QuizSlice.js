import {createSlice} from '@reduxjs/toolkit'

const quizSlice = createSlice({
    name: "quiz",
    initialState:{
        loading: false,
        allQuestions: [],
        selectedOptions:[
            {
                id: 1,
                option: "",
            },
            {
                id: 2,
                option: "",
            },
            {
                id: 3,
                option: "",
            },
            {
                id: 4,
                option: "",
            },
            {
                id: 5,
                option: "",
            },
            {
                id: 6,
                option: "",
            },
            {
                id: 7,
                option: "",
            },
            {
                id: 8,
                option: "",
            },
            {
                id: 9,
                option: "",
            },
            {
                id: 10,
                option: "",
            },
        ],
        error: null
    },
    reducers:{
        getAllQuestionsRequest:(state)=>{
            state.loading = true ;
        },
        getAllQuestionsSuccess:(state, action)=>{
            state.loading = false ;
            state.allQuestions = action.payload
        },
        getAllQuestionsFail:(state,action)=>{
            state.loading = false ;
            state.error = action.payload
        },

        setQuestionsOption: (state, action)=>{
            state.selectedOptions = action.payload
        },

        submitQuizRequest:(state)=>{
            state.loading = true ;
        },
        submitQuizSuccess:(state)=>{
            state.loading = false ;
        },
        submitQuizFail:(state,action)=>{
            state.loading = false ;
            state.error = action.payload
        },

    }
})

export const {getAllQuestionsRequest,getAllQuestionsSuccess,getAllQuestionsFail, setQuestionsOption,
    submitQuizRequest,submitQuizSuccess,submitQuizFail
} = quizSlice.actions

export default quizSlice.reducer