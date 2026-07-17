import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CommonForm from '@/components/common/Form';
import { registerFormControls } from '@/config';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../store/auth-slice/index';
import { toast } from "sonner"

const initialState = {
  userName:'',
  email:'',
  password:''
}
const AuthRegister = () => {
  const [formData,setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (event)=>
  {
     event.preventDefault();
     dispatch(registerUser(formData)).then((data)=>{
      if (data.payload?.success) {
      toast.success("Registration successful!", { position: "top-right" });
      navigate("/auth/login");
      }   
      else {
      toast.error(data.payload?.message || "Registration failed"  , { position: "top-right" });
      }
     })
  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
      </div>
      <CommonForm formControls={registerFormControls} formData={formData} 
      setFormData={setFormData} onSubmit={onSubmit}
      buttonText={'Sign up'}></CommonForm>
      <div className='text-center'>
              <p className='mt-2 inline'>Already have an account</p>
      <Link className='font-medium ml-2 text-primary hover:underline' 
      to='/auth/login'>Login</Link>
      </div>
    </div>
  )
}

export default AuthRegister;