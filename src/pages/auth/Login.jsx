import CommonForm from '@/components/common/Form'
import React, { useState } from 'react'
import { loginFormControl } from '@/config'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../store/auth-slice'
import { toast } from "sonner"

const initialState = {
  email:'',
  password:''
}

const AuthLogin = () => {
  const [formData,setFormData] = useState(initialState)
  const dispatch = useDispatch()
const onSubmit = (e)=>{
  e.preventDefault();
  dispatch(loginUser(formData)).then((data)=>{
     if (data.payload?.success) {
      toast.success("Login successful!", { position: "top-right" });
      navigate("/auth/login");
      }   
      else {
      toast.error(data.payload?.message || "Login failed"  , { position: "top-right" });
      }
  })
}
  return (  
    <div className='mx-auto w-full max-w-md space-y-6'>
        <div className='text-center'>
            <h1 className='text-3xl font-bold tracking-tight text-foreground'>Login To Ecommerce</h1>
        </div>
        <CommonForm formData={formData} setFormData={setFormData} formControls={loginFormControl} buttonText={"Sign In"}
        onSubmit={onSubmit}
        ></CommonForm>
        <div className='text-center'>
        <p className='mt-2 inline'>Don't have an account:</p>
        <Link className='font-medium ml-2 text-primary hover:underline' 
        to='/auth/register'>Register</Link>
        </div>
    </div>
  )
}

export default AuthLogin