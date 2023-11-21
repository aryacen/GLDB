import React, { useContext, useEffect, useState } from 'react';
import TopSection from '../components/TopSection';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProfilePicture from '../components/ui/ProfilePicture';

const Friends = () => {
  const [friendRequest, setFriendRequest] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { user } = useContext(AuthContext);
  const id = user._id;
  const { dark } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/users/${id}`)
      .then((response) => {
        setFriendList(response.data.friends_list);
        setFriendRequest(response.data.friend_requests_received);
        console.log('test');
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const friendListDiv = friendList.map((item) => {
    const link = `/profile/${item.userId}`;
    const handleOnClick = () => {
      axios
        .post("http://localhost:9000/api/users/removefriend", {
          senderId: id,
          receiverId: item.userId,
        })
        .then((response) => {
          console.log(`unfriended ${item.username}`, response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return (
      <div className={dark ? 'friend-list-element_dark' : 'friend-list-element'} key={item.userId}>
        <div className='username-and-img_list'>
          <Link to={link}>
            <ProfilePicture
              key={item.userId}
              var1={[
                item.profile_picture,
                'friend-request-img',
                item.border_color,
              ]}
            />
            <p>{item.username}</p>
          </Link>
        </div>

        <div className='unfriend-img_container'>
          <img
            src={dark ? require('../assets/unfriend-icon_dark.png') : require('../assets/unfriend-icon.jpg')}
            className='decline-img'
            onClick={handleOnClick}
          />
        </div>
      </div>
    );
  });

  const friendReqDiv = friendRequest.map((item) => {
    const link = `/profile/${item.userId}`;
    console.log(item.border_color);
    const handleOnClickAccept = () => {
      axios
        .post('http://localhost:9000/api/users/acceptfriendrequest', {
          fr_id: item.requestId,
          id: id,
        })
        .then((response) => {
          console.log('accepted friend request', response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const handleOnClickDecline = () => {
      axios
        .post('http://localhost:9000/api/users/declinefriendrequest', {
          fr_id: item.requestId,
          id: id,
        })
        .then((response) => {
          console.log('accepted friend request', response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    };
    return (
      <div className={dark ? 'friend-request-element_dark' : 'friend-request-element'} key={item.requestId}>
        <div className='username-and_img'>
          <Link to={link}>
            <ProfilePicture
              var1={[
                item.profile_picture,
                'friend-request_img',
                item.border_color,
              ]}
            />
            <p>{item.username}</p>
          </Link>
        </div>

        <div className='accept-decline'>
          <img
            src={require('../assets/accept-circular-button-outline.png')}
            className='accept-img'
            onClick={handleOnClickAccept}
          ></img>

          <img
            src={require('../assets/decline.png')}
            className='decline-img'
            onClick={handleOnClickDecline}
          ></img>
        </div>
      </div>
    );
  });

  return (
    <>
      <TopSection />
      {loaded ? (
        <div className='friend-page-container'>
          <div className='friend-requests-container'>
            <h2>Friend Requests</h2>
            {friendReqDiv}
          </div>
          <div className='friend-list-container'>
            <h2>Friend List</h2>
            {friendListDiv}
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

export default Friends;
