import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const signUpSchema = yup.object().shape ({
    email: yup
    .string()
    .email('Invalid email')
    .required('Email is required')
    .min(3, 'Email must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  passwordCOnfirmation: yup 
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password Confirmation is required'),
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters'),
  address: yup
    .string()
    .required('Name is required')
    .min(3,'Address must be at least 3 characters'),
});

const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(signUpSchema),
  });

const onSubmit = data => console.log(data);

const SignUpForm = () => {
  return (
    <div className='auth-container'>
        <h3> <span> Sign Up Here</span></h3>
     
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name: </label>
      <input type='text' name='name' placeholder='Fullname' {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <label>Address: </label>
      <input type='text' name='address' placeholder='Address' {...register("address")} />
      {errors.address && <p>{errors.address.message}</p>}
        
      <label>Email: </label>
      <input type='text' name='email' placeholder='Email' {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <label>Password: </label>
      <input type='password' name='password' placeholder='**********' {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}
      

      <label>Password Confirmation: </label>
      <input type='password' name='passwordConfirmation' placeholder='***********' {...register("name")} />
      {errors.passwordConfirmation && (<p>{errors.passwordConfirmation.message}</p>)}
     
     <button type="submit">Sign Up</button>
    </form>
      
    </div>
  );
}

export default SignUpForm
