import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getScore } from '../actions/quizActions';
import { Loader } from '../components/Loader';
import { Navbar } from '../components/Navbar';


export const Score = () => {
    const { isLogin } = useSelector((state) => state.user);
    const { myScore, loading } = useSelector((state) => state.quiz);

    const dispatch = useDispatch() ;
    const navigate = useNavigate() ;


    useEffect(() => {
        if (!isLogin) {
          navigate("/auth/login");
        }
      }, [isLogin]);


      useEffect(()=>{
        const getScoreMy = ()=>{
          dispatch(getScore())
        }

        getScoreMy()
      },[])


      const formatDate = (str)=>{
            return  str.slice(0,10).split("-")[2] + "/" + str.slice(0,10).split("-")[1] + "/" + str.slice(0,10).split("-")[0]
      } 

  return (
    <>

        <div className='min-h-screen bg-black text-white'>
          <Navbar/>


           {loading ? <Loader/> : <div className='flex flex-col pt-32 items-center justify-center gap-5'>
                <p className='text-4xl font-bold'>Your Score</p>

                
                {myScore ? // Add a null check here before accessing properties of score
              <>
                <p className='text-5xl font-semibold'>{myScore.score}/{myScore.maximumScore}</p>
                <p className='text-2xl font-semibold'>Submission Date: {formatDate(myScore.createdAt)}</p>
              </>
              :
              <p className='text-2xl font-semibold'>Score not available</p>
            }
                
            </div>}


            
        </div>
    
    </>
  )
}
