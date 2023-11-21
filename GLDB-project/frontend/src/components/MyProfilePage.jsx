import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fileToUrl } from './utils/fileToUrl';
import axios from 'axios';
import ColorPicker from './ui/ColorPicker';
import ProfilePicture from './ui/ProfilePicture';
import GenreModal from './GenreModal';
import { SketchPicker } from 'react-color';
import UserMenuButton from './ui/UserMenuButton';

const MyProfilePage = () => {
  const location = useLocation();
  const { user, loading, dispatch, dark, error } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [profilePicture, setProfilePicture] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [hexColour, setHexColour] = useState();
  const [pro, setPro] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [errorImage, setErrorImage] = useState(false);

  const id = location.pathname.split('/')[2];
  const [userData, setUserData] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPro(user.pro_user);
    setUsername(user.username);
    setEmail(user.email);
    setProfilePicture(user.profile_picture);
    setWishlist(user.wish_list);
  });

  useEffect(() => {
    setHexColour(user.border_color);
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    fileToUrl(file).then((base64Str) => {
      axios
        .put(`http://localhost:9000/api/users/profilepicture/${id}`, {
          profile_picture: base64Str,
        })
        .then((response) => {
          console.log(
            'SUCCESSFULLY UPDATED USER PROFILE PICTURE',
            response.data
          );
          dispatch({
            type: 'UPDATE_USER',
            payload: response.data,
          });
          setErrorImage(false);
        })
        .catch((error) => {
          console.error(error);
          setErrorImage(true);
        });
    });
  };

  const wishlistDiv = wishlist
    .map((item) => {
      const movieLink = `/movie/details/${item.movieId}`;
      return (
        <Link to={movieLink}>
          <div className='wishlist-preview' key={item.movieId}>
            <img src={item.moviePoster} className='poster-preview'></img>
            <h2>{item.movieTitle}</h2>
          </div>
        </Link>
      );
    })
    .splice(0, 3);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:9000/api/users/update/${id}`, userData)
      .then((response) => {
        console.log('user successfully updated!', response.data);
        dispatch({
          type: 'UPDATE_USER',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error('Error updating user profile', error);
        const status_code = Number(error.response.request.status);
        if (status_code === 400) {
          dispatch({ type: "UPDATE_FAILURE", payload: 'Email is already registered' });
        } else if (status_code === 402) {
          dispatch({ type: "UPDATE_FAILURE", payload: 'Username is already taken' });
        } else {
          dispatch({ type: "UPDATE_FAILURE", payload: 'Username must be between 4 and 50 characters' });
        }
      });
  };

  const handleColorChange = (color) => {
    setHexColour(color.hex);
    axios
      .put(`http://localhost:9000/api/users/setbordercolor/${id}`, {
        color: color.hex,
      })
      .then((response) => {
        console.log('border colour changed to: ', color.hex);
        dispatch({
          type: 'UPDATE_USER',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error('error changing border color', error);
      });
  };

  const handleOpenColorPicker = () => {
    setDisplayColorPicker(!displayColorPicker);
  }

  const handleCloseColorPicker = () => {
    setDisplayColorPicker(false);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const wishlistLink = `/wishlist/${id}`;
  const editPasswordLink = `/editpassword/${id}`;

  return (
    <>
      {!loading ? (
        <div className='profile-page' key={id}>
          <UserMenuButton/>
          <div className='hello-user_container' key={id}>
            <h1>Hello, {username}</h1>
          </div>
          <div className='wishlist_container'>
            <h1>Wishlist</h1>
            {wishlistDiv}
            <Link to={wishlistLink}>
              <button className='wishlist-button'>View full wishlist</button>
            </Link>
          </div>
          <div className='profile-page_part2'>
            <div className='profile-picture__container'>
              <ProfilePicture
                var1={[
                  profilePicture,
                  'profile_picture_account',
                  hexColour,
                  handleImageClick,
                ]}
              />
              {errorImage ? <p className='error-message-image'>File is too big</p> : <></>}
              <div className='image_overlay'>
                <p className='hover_text' onClick={handleImageClick}>
                  Choose photo
                </p>
              </div>
              {pro ? (
                <>
                  <img
                    src={dark ? require('../assets/prologo_dark.png') : require('../assets/prologo.png')}
                    className='pro-badge_profile'
                    title='You are a pro user!'
                  />
                </>
              ) : (
                <></>
              )}
              <input
                type='file'
                accept='image/*'
                onChange={handleFileInputChange}
                className='hidden-file-input'
                ref={fileInputRef}
              ></input>
            </div>

            {pro ? (
              <>
                <div
                  className='color-picker_border'
                  style={{ border: `3px solid ${hexColour}` }}
                ></div>
                <div className='colorpicker_div'>
                  <h2>Border Color</h2>
                  <button onClick={handleOpenColorPicker} className={dark ? 'select-color-button_dark' : 'select-color-button'}>Select</button>
                  {displayColorPicker ? (
                    <div style={{ position: 'absolute', zIndex: '50' }}>
                      <div
                        style={{
                          position: 'fixed',
                          top: '0px',
                          right: '0px',
                          bottom: '0px',
                          left: '0px',
                        }}
                        onClick={handleCloseColorPicker}
                      />
                      <SketchPicker color={hexColour} onChange={handleColorChange} />
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <></>
            )}

            <div className='modal-button_container'>
              <button
                className={dark ? 'modal-button_profile_dark' : 'modal-button_profile'}
                onClick={() => setShowModal(true)}
              >
                Select preferred genres
              </button>
              <GenreModal show={[showModal, id]} onClose={handleCloseModal} />
            </div>

            <h1 className='h1_profile'>User credentials</h1>
            <div className='input-container'>
              <form
                className='register__form--wrapper'
                onSubmit={handleSubmit}
                action=''
              >
                {' '}
                <h3 className='pr-input-text'>Username</h3>
                <input
                  className={dark ? 'form_wrapper_dark' : 'profile_page__form--wrapper'}
                  onChange={handleChange}
                  type='text'
                  name='new_username'
                  placeholder={username}
                ></input>
                <h3 className='pr-input-text'>Email</h3>
                <input
                  className={dark ? 'form_wrapper_dark' : 'profile_page__form--wrapper'}
                  onChange={handleChange}
                  type='email'
                  name='new_email'
                  placeholder={email}
                ></input>
                <button
                  className={dark ? 'save-button_profile_dark' : 'save-button_profile'}
                  onSubmit={handleSubmit}
                  type='submit'
                  name='submit'
                >
                  Save
                </button>
                {error && (
                  <>
                    <br />
                    <br />
                    <p className="error-message">{error}</p>
                  </>
                )}
              </form>
              <Link to={editPasswordLink}>
                <button className={dark ? 'edit-password_button_dark' : 'edit-password_button'}>Edit password</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='loading_container'>
          <img
            src={dark ? require("../assets/loading_gif_transparent.gif") : require("../assets/loading_gif.gif")}
            className="loading-gif-img"
          />
        </div>
      )}
    </>
  );
};

export default MyProfilePage;
