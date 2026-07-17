import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CommonForm from '@/components/common/Form';
import { registerFormControls } from '@/config';
const initialState = {
  userName:'',
  email:'',
  password:''
}
const AuthRegister = () => {
  const [formData,setFormData] = useState(initialState);
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
      </div>
      <CommonForm formControls={registerFormControls} formData={formData} 
      setFormData={setFormData}
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