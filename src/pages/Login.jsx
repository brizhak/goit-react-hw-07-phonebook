import React from 'react';
import style from './Login.module.css';
import { useDispatch } from 'react-redux';
import { loginUser } from 'redux/authReducer';

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const email = event.currentTarget.elements.userEmail.value;
    const password = event.currentTarget.elements.userPassword.value;

    const formData = {
      email,
      password,
    };

    dispatch(loginUser(formData));
  };
  return (
    <div className={style.container}>
      <h1>Log in to your account</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>
          Email
          <input
            className={style.input}
            type="email"
            name="userEmail"
            placeholder="Enter your email..."
            required
          />
        </label>
        <label className={style.label}>
          Password
          <input
            className={style.input}
            type="password"
            name="userPassword"
            placeholder="Enter your password..."
            minLength={7}
            required
          />
        </label>
        <button className={style.btn} type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
