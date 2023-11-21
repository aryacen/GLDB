import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const GenreModal = (props) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [horrorClick, setHorrorClick] = useState(false);
  const [adventureClick, setAdventureClick] = useState(false);
  const [fantasyClick, setFantasyClick] = useState(false);
  const [actionClick, setActionClick] = useState(false);
  const [crimeClick, setCrimeClick] = useState(false);
  const [thrillerClick, setThrillerClick] = useState(false);
  const [comedyClick, setComedyClick] = useState(false);
  const [romanceClick, setRomanceClick] = useState(false);
  const [animationClick, setAnimationClick] = useState(false);
  const [familyClick, setFamilyClick] = useState(false);
  const [scifiClick, setScifiClick] = useState(false);
  const [westernClick, setWesternClick] = useState(false);
  const [clickDisabled, setClickDisabled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { dark } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/users/${props.show[1]}`)
      .then((response) => {
        setSelectedGenres(response.data.preferred_genres);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setSelectedGenres]);

  useEffect(() => {
    setHorrorClick(false);
    setAdventureClick(false);
    setFantasyClick(false);
    setActionClick(false);
    setCrimeClick(false);
    setThrillerClick(false);
    setComedyClick(false);
    setRomanceClick(false);
    setAnimationClick(false);
    setFamilyClick(false);
    setScifiClick(false);
    setWesternClick(false);

    const genreMap = {
      Horror: setHorrorClick,
      Adventure: setAdventureClick,
      Fantasy: setFantasyClick,
      Action: setActionClick,
      Crime: setCrimeClick,
      Thriller: setThrillerClick,
      Comedy: setComedyClick,
      Romance: setRomanceClick,
      Animation: setAnimationClick,
      Family: setFamilyClick,
      'Science Fiction': setScifiClick,
      Western: setWesternClick,
    };

    const selectedGenresMap = selectedGenres.reduce((map, genre) => {
      if (genreMap[genre]) {
        map[genre] = true;
      }
      return map;
    }, {});

    Object.keys(selectedGenresMap).forEach((genre) => {
      if (genreMap[genre]) {
        genreMap[genre](true);
      }
    });
  }, [
    selectedGenres,
    setHorrorClick,
    setAdventureClick,
    setFantasyClick,
    setActionClick,
    setCrimeClick,
    setThrillerClick,
    setComedyClick,
    setRomanceClick,
    setAnimationClick,
    setFamilyClick,
    setScifiClick,
    setWesternClick,
  ]);

  const handleClick = (genre, setState) => {
    if (!clickDisabled) {
      setClickDisabled(true);
      setTimeout(() => {
        setClickDisabled(false);
        setState((prevState) => !prevState);
        axios
          .put(`http://localhost:9000/api/users/updategenres`, {
            id: props.show[1],
            genreName: genre,
          })
          .then((response) => {
            console.log('Updated preference!', response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, 200);
    }
  };
  return (
    <>
      {loaded && (
        <div
          className={dark ? 'genre-modal-dark' : 'genre-modal'}
          style={{
            opacity: props.show[0] ? 1 : 0,
            transform: props.show ? 'scale(1)' : 'scale(0.5)',
          }}
        >
          <div className='genre-modal_content'>
            <img
              src={
                !dark
                  ? require('../assets/closemodal_dark.png')
                  : require('../assets/closemodal.png')
              }
              className='closemodal-icon'
              onClick={props.onClose}
            />
            <div
              className='genre-container'
              style={{ pointerEvents: props.show[0] ? 'auto' : 'none' }}
            >
              <div
                className={
                  dark
                    ? horrorClick
                      ? 'horror-div_clicked_dark'
                      : 'horror-div'
                    : horrorClick
                    ? 'horror-div_clicked'
                    : 'horror-div'
                }
                onClick={() => handleClick('Horror', setHorrorClick)}
              >
                <img
                  src={
                    dark
                      ? require('../assets/horror_icon_dark.png')
                      : require('../assets/horror_icon.png')
                  }
                  className='genre-icon'
                />
                <h3>Horror</h3>
              </div>
              <div
                className={
                  dark
                    ? adventureClick
                      ? 'horror-div_clicked_dark'
                      : 'horror-div'
                    : adventureClick
                    ? 'horror-div_clicked'
                    : 'horror-div'
                }
                onClick={() => handleClick('Adventure', setAdventureClick)}
              >
                <img
                  src={
                    dark
                      ? require('../assets/adventure-icon_dark.png')
                      : require('../assets/adventure-icon.png')
                  }
                  className='genre-icon'
                />
                <h3>Adventure</h3>
              </div>
              <div
                className={
                  dark
                    ? fantasyClick
                      ? 'horror-div_clicked_dark'
                      : 'horror-div'
                    : fantasyClick
                    ? 'horror-div_clicked'
                    : 'horror-div'
                }
                onClick={() => handleClick('Fantasy', setFantasyClick)}
              >
                <img
                  src={
                    dark
                      ? require('../assets/fantasy_icon_dark.png')
                      : require('../assets/fantasy_icon.png')
                  }
                  className='genre-icon'
                />
                <h3>Fantasy</h3>
              </div>
              <div
                className={
                  dark
                    ? actionClick
                      ? 'horror-div_clicked_dark'
                      : 'horror-div'
                    : actionClick
                    ? 'horror-div_clicked'
                    : 'horror-div'
                }
                onClick={() => handleClick('Action', setActionClick)}
              >
                <img
                  src={
                    dark
                      ? require('../assets/action_icon_dark.png')
                      : require('../assets/action_icon.png')
                  }
                  className='genre-icon'
                />
                <h3>Action</h3>
              </div>
              <div
                className={
                  dark
                    ? crimeClick
                      ? 'horror-div_clicked_dark'
                      : 'horror-div'
                    : crimeClick
                    ? 'horror-div_clicked'
                    : 'horror-div'
                }
                onClick={() => handleClick('Crime', setCrimeClick)}
              >
                <img
                  src={
                    dark
                      ? require('../assets/crime_icon_dark.png')
                      : require('../assets/crime_icon.png')
                  }
                  className='genre-icon'
                />
                <h3>Crime</h3>
              </div>
              <div
                className={
                  dark
                    ? thrillerClick
                      ? 'horror-div_clicked_dark'
                      : 'horror-div'
                    : thrillerClick
                    ? 'horror-div_clicked'
                    : 'horror-div'
                }
                onClick={() => handleClick('Thriller', setThrillerClick)}
              >
                <img
                  src={
                    dark
                      ? require('../assets/thriller_icon_dark.png')
                      : require('../assets/thriller_icon.png')
                  }
                  className='genre-icon'
                />
                <h3>Thriller</h3>
              </div>
              <div
                className={
                  dark
                    ? comedyClick
                      ? 'horror-div_clicked_dark'
                      : 'horror-div'
                    : comedyClick
                    ? 'horror-div_clicked'
                    : 'horror-div'
                }
                onClick={() => handleClick('Comedy', setComedyClick)}
              >
                <img
                  src={
                    dark
                      ? require('../assets/comedy_icon_dark.png')
                      : require('../assets/comedy_icon.png')
                  }
                  className='genre-icon'
                />
                <h3>Comedy</h3>
              </div>
              <div
                className={
                  dark
                    ? romanceClick
                      ? 'horror-div_clicked_dark'
                      : 'horror-div'
                    : romanceClick
                    ? 'horror-div_clicked'
                    : 'horror-div'
                }
                onClick={() => handleClick('Romance', setRomanceClick)}
              >
                <img
                  src={
                    dark
                      ? require('../assets/romance_icon_dark.png')
                      : require('../assets/romance_icon.png')
                  }
                  className='genre-icon'
                />
                <h3>Romance</h3>
              </div>
              <div
                className={
                  dark
                    ? animationClick
                      ? 'horror-div_clicked_dark'
                      : 'horror-div'
                    : animationClick
                    ? 'horror-div_clicked'
                    : 'horror-div'
                }
                onClick={() => handleClick('Animation', setAnimationClick)}
              >
                <img
                  src={
                    dark
                      ? require('../assets/animation_icon_dark.png')
                      : require('../assets/animation_icon.png')
                  }
                  className='genre-icon'
                />
                <h3>Animation</h3>
              </div>
              <div
                className={
                  dark
                    ? familyClick
                      ? 'horror-div_clicked_dark'
                      : 'horror-div'
                    : familyClick
                    ? 'horror-div_clicked'
                    : 'horror-div'
                }
                onClick={() => handleClick('Family', setFamilyClick)}
              >
                <img
                  src={
                    dark
                      ? require('../assets/family_icon_dark.png')
                      : require('../assets/family_icon.png')
                  }
                  className='genre-icon'
                />
                <h3>Family</h3>
              </div>
              <div
                className={
                  dark
                    ? scifiClick
                      ? 'horror-div_clicked_dark'
                      : 'horror-div'
                    : scifiClick
                    ? 'horror-div_clicked'
                    : 'horror-div'
                }
                onClick={() => handleClick('Science Fiction', setScifiClick)}
              >
                <img
                  src={
                    dark
                      ? require('../assets/ufo_dark.png')
                      : require('../assets/ufo.png')
                  }
                  className='genre-icon'
                />
                <h3>Sci-Fi</h3>
              </div>
              <div
                className={
                  dark
                    ? westernClick
                      ? 'horror-div_clicked_dark'
                      : 'horror-div'
                    : westernClick
                    ? 'horror-div_clicked'
                    : 'horror-div'
                }
                onClick={() => handleClick('Western', setWesternClick)}
              >
                <img
                  src={
                    dark
                      ? require('../assets/western_icon_dark.png')
                      : require('../assets/western_icon.png')
                  }
                  className='genre-icon'
                />
                <h3>Western</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GenreModal;
