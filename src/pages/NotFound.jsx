import React from 'react';
import { Link } from 'react-router-dom';
import style from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={style.container}>
      Error 404. Page not found.
      <br />
      <Link to="/"> Back to the Home page.</Link>
    </div>
  );
};

export default NotFound;
