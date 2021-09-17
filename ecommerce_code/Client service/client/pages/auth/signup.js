import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

const Signuped = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      userName,
      email,
      password
    },
    onSuccess: (responseData) => {
      console.log(responseData);
      if(responseData.errors){
        Swal.fire({
          icon: 'error',
          title: responseData.errors,
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        Swal.fire({
          icon: 'success',
          title: 'Đăng ký thành công',
          showConfirmButton: false,
          timer: 1500
        })
        Router.push('./signin')
      }
      
      console.log(responseData.errors);
    },

  });


  const onSubmit = async () => {
    await doRequest();
  };

  // prevent submitting invalid or empty emails
  const { register, formState: { errors }, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <h1 style={{ marginTop: '120px', marginBottom: '30px', textAlign: 'center' }} >Đăng Ký</h1>
      <div className="form-group">
        <label>User Name</label>
        <input
          {...register('userName', {
            required: "Please enter your User Name.",
            minLength: { value: 3, message: "Too short" },
          })}
          type="text"
          placeholder="user name"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          className="form-control"
        />
        {errors.userName && <p className="alert alert-danger" role="alert">{errors.userName.message}</p>}
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          {...register('email', {
            required: "Please enter your Email.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email"
            }
          })}
          value={email}
          type="text"
          placeholder="email@gmail.com"

          onChange={e => setEmail(e.target.value)}
          className="form-control"
        />
        {errors.email && <p className="alert alert-danger" role="alert" > {errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          {...register('password', {
            required: "Please enter Password.",
            // minLength: { value: 6, message: "Too short" },
            // maxLength: { value: 20, message: "Too long" },
            pattern:{ 
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
              message: "Password should contain at least a capital letter, a small letter, a number and a special character"
            }
            
          })}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="form-control"
        />
        {errors.password && <p className="alert alert-danger" role="alert">{errors.password.message}</p>}
      </div>
      <button className="btn btn-primary" style={{ marginLeft: '46%' }}>Đăng Ký</button>
    </form>
  );
};

export default Signuped;