import React, { useState } from 'react';
import PropTypes from 'prop-types';

function RegisterInput({ register }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    register({
      name,
      email,
      password,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className='input-register'>
      <input type="text" name="name" placeholder="Name" value={name} onChange={onChangeHandler} />
      <input type="email" name="email" placeholder="Email" value={email} onChange={onChangeHandler} />
      <input type="password" name="password" placeholder="Password" autoComplete='current-password' value={password} onChange={onChangeHandler} />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" autoComplete='current-password' value={confirmPassword} onChange={onChangeHandler} />
      <button>Register</button>
    </form>
  )
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
