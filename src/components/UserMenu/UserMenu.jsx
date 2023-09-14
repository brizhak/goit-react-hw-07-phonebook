import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, selectUserData } from 'redux/authReducer';
import style from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  const handleLogOut = () => {
    dispatch(logOutUser());
  };
  return (
    <div className={style.container}>
      <p>{userData.email}</p>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default UserMenu;
