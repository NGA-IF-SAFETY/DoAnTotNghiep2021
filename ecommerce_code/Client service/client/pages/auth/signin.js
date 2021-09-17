import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";

const Signined = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: (responseData) => {
      if(responseData.errors){
        Swal.fire({
          icon: 'error',
          title: responseData.errors,
          showConfirmButton: false,
          timer: 1500
        })
      }
      else{
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công',
          showConfirmButton: false,
          timer: 1500
        })
        Router.push('/')
      }
    },

  });


  const onSubmit = async () => {
    await doRequest();
  };

  // prevent submitting invalid or empty emails
  const { register, formState: { errors }, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <h1 style={{ marginTop: '120px', marginBottom: '30px', textAlign: 'center' }}>Đăng Nhập</h1>
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
        {errors.email && <p className="alert alert-danger" role="alert"> {errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          {...register('password', {
            required: "Please enter Password.",
            // minLength: { value: 6, message: "Too short" },
            // maxLength: { value: 20, message: "Too long" }
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
      <button className="btn btn-primary" style={{ marginLeft: '46%' }}>Đăng Nhập</button>
    </form>
  );
};

export default Signined;