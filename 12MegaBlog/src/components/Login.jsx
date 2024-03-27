import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authSlice, { login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/authservice'
import {useForm} from 'react-hook-form'

function Login() {
    const {register,handleSubmit } = useForm();
    const dispatch= useDispatch();
    const navigate = useNavigate()
    const [error, seterror] = useState("")
    const login = async(data)=>{
        console.log(data);
        seterror("")
        try {
            const session = await authservice.login(data)
            if(session){
                const userData=await authservice.getCurrentUser();
                if(userData) 
                {
                    dispatch(authSlice(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            seterror(error.message)
        }
            
        
    }
  return (
    <div
    className='flex items-center justify-center w-full'
    >

        <div className={`mx-auto w-full max-w-lg
        bg-gray-100 roundex-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-cneter'>
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width='100%'/>
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your Account </h2>
            <p className="mt-2 text-cneter text-base text-black/60">  
                Don&apos;t have account ?&nbsp;
                <Link
                to="/signup"
                className="font-medium text-primary
                transition-all duration-200
                hover:underline">
                    Sign Up
                </Link>
         </p>
         {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
         {/* handlesubmit will automatically call when we submit the form and it will take the method which 
         we want to perform like we have login method */}
         <form onSubmit={handleSubmit(login)}
         className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email"
                placeholder="Enter an Email"
                type="email"
               //we are using useForm thats why using register and it takes key and value (object of options). key must be unique beacuse for different input component we must know for which component this register is for.
               //
                {...register("email",{
                    required:true,
                    validate:{
                        matchPatern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address"
                         
                    }
                })}/>
                <Input
                label="Password"
                type="password"
                placeholder="Enter Password"
                {...register("password",{
                    required:true          
                })}/>
                <Button 
                type='submit'
                className='w-full'
                >Sign In</Button>
            </div>

         </form>
        </div>
    </div>
  )
}

export default Login