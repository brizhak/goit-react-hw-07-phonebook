import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from 'redux/authReducer';
import style from './Register.module.css';

const Register = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const name = event.currentTarget.elements.userName.value;
    const email = event.currentTarget.elements.userEmail.value;
    const password = event.currentTarget.elements.userPassword.value;

    const formData = {
      name,
      email,
      password,
    };

    dispatch(registerUser(formData));
  };
  return (
    <div className={style.container}>
      <h1>Register your account</h1>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>
          Username
          <input
            className={style.input}
            type="text"
            name="userName"
            placeholder="Enter your name..."
            required
          />
        </label>
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
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
