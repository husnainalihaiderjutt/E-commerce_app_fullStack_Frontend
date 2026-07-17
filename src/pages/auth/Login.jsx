import CommonForm from '@/components/common/Form'
import React, { useState } from 'react'
import { loginFormControl } from '@/config'
import { Link } from 'react-router-dom'
const initialState = {
  email:'',
  password:''
}
const AuthLogin = () => {
  const [formData,setFormData] = useState(initialState)
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
        <div className='text-center'>
            <h1 className='text-3xl font-bold tracking-tight text-foreground'>Login To Ecommerce</h1>
        </div>
        <CommonForm formData={formData} setFormData={setFormData} formControls={loginFormControl} buttonText={"Sign In"}></CommonForm>
        <div className='text-center'>
        <p className='mt-2 inline'>Don't have an account:</p>
        <Link className='font-medium ml-2 text-primary hover:underline' 
        to='/auth/register'>Register</Link>
        </div>
    </div>
  )
}

export default AuthLogin