import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/UserSlice'
import quizReducer from './slices/QuizSlice'


export const store = configureStore({
	reducer:{
		user: userReducer,
		quiz: quizReducer	
	}
})