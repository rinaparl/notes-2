import React, { useState } from 'react';
import PropTypes from 'prop-types';

function LoginInput({ login }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onEmailChangeHandler = (event) => {
    setFormData({ ...formData, email: event.target.value });
  };

  const onPasswordChangeHandler = (event) => {
    setFormData({ ...formData, password: event.target.value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    login({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className='input-login'>
      <input type="email" placeholder='Email' value={email} onChange={onEmailChangeHandler} />
      <input type="password" placeholder='Password' value={password} onChange={onPasswordChangeHandler} />
      <button>Masuk</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginInput;
