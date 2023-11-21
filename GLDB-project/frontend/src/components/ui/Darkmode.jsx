import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const DarkMode = () => {
  const { user, token, dark, dispatch } = useContext(AuthContext);
  const handeClick = () => {
    dispatch({
      type: 'CLICK_TOGGLE',
      user: user,
      token: token,
      dark: dark,
    });
  };
  return (
    <div className='darkMode__container'>
      {dark ? (
        <img
          className='dark__mode--img'
          onClick={handeClick}
          src={require('../../assets/light_mode.png')}
          alt='Crescent Moon'
        />
      ) : (
        <img
          className='dark__mode--img'
          onClick={handeClick}
          src={require('../../assets/night_mode.png')}
          alt='Crescent Moon'
        />
      )}
    </div>
  );
};

export default DarkMode;
