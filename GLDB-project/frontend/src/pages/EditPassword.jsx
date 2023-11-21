import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import TopSection from '../components/TopSection';

const EditPassword = () => {
  const [passwordData, setPasswordData] = useState({});
  const [passwordError, setPasswordError] = useState();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpdatePassword = () => {
    axios
      .put(
        `http://localhost:9000/api/auth/changepassword/${user._id}`,
        passwordData
      )
      .then((response) => {
        dispatch({
          type: 'UPDATE_USER',
          payload: response.data,
        });
        setPasswordError(null);
        navigate(`/profile/${user._id}`);
      })
      .catch((error) => {
        console.error(error);
        const status_code = Number(error.response.request.status);
        if (status_code === 405) {
          setPasswordError('Incorrect password');
        } else if (status_code === 401) {
          setPasswordError('Passwords do not match');
        } else {
          setPasswordError(
            'Passwords must be at least 4 characters long, contains at least one uppercase and lowercase character, a symbol and a number'
          );
        }
      });
  };

  const handlePasswordChange = (event) => {
    setPasswordData({
      ...passwordData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
    <TopSection />
    <div>
      <h2 className='h2_text_edit'>Change your password</h2>
      <div className='register__container'>
          <div className='input-container_p'>
            <h3 className='fp-input-text'>Current password</h3>
            <input
              className='register__input--bar'
              onChange={handlePasswordChange}
              type='password'
              name='current_password'
              required
            ></input>
            <h3 className='fp-input-text'>New password</h3>
            <input
              className='register__input--bar'
              onChange={handlePasswordChange}
              type='password'
              name='new_password'
              required
            ></input>
            <h3 className='fp-input-text'>Confirm password</h3>
            <input
              className='register__input--bar'
              onChange={handlePasswordChange}
              type='password'
              name='new_password_confirm'
              required
            ></input>
            <button
              className='fp-continue-button'
              onClick={handleUpdatePassword}
              type='submit'
              name='submit'
            >
              Update password
            </button>
            {passwordError ? (
              <p className='error-message_profile'>{passwordError}</p>
            ) : (
              <></>
            )}
          </div>
      </div>
    </div>
    </>
  );
};

export default EditPassword;
