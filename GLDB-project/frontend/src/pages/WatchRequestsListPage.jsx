import React, { useContext, useEffect, useState } from "react";
import TopSection from "../components/TopSection";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const WatchRequestsListPage = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [initialEvents, setInitialEvents] = useState([]);
  const [event, setEvent] = useState({});
  const { user } = useContext(AuthContext);
  const userId = user._id;
  const { dark } = useContext(AuthContext);

  /*
  const getInitialEvents = async () => {
    let initialEvents = [];
    await axios
      .get(`http://localhost:9000/api/calendar/getEvents/${userId}`)
      .then((res) => {
        initialEvents = res.data;
        console.log(res);
        console.log(initialEvents);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(initialEvents);
    return initialEvents;
  };
  */

  const renderEventContent = (eventInfo) => {
    return (
      <div className="event-content">
        <i>{eventInfo.event.title}</i>
      </div>
    );
  };

  useEffect(() => {

    axios
    .get(`http://localhost:9000/api/calendar/getEvents/${userId}`)
    .then((res) => {
      setInitialEvents(res.data);
      console.log(res);
      console.log(initialEvents);
    })
    .catch((error) => {
      console.log(error);
    });

    axios
      .get(`http://localhost:9000/api/calendar/getReceivedRequest/${userId}`)
      .then((response) => {
        setReceivedRequests(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`http://localhost:9000/api/calendar/getSentRequest/${userId}`)
      .then((response) => {
        setSentRequests(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const ReceivedContainer = (req) => {
    const request = req.request;

    const handleMouseEnter = () => {
      setEvent({...request.event,color:"#4a9486"});
    };

    const handleMouseLeave = () => {
      setEvent({});
    };

    const handleAccept = () => {
      axios
        .post(`http://localhost:9000/api/calendar/accecpt/${userId}`, request)
        .then(window.location.reload())
        .catch((error) => {
          console.error(error);
        });
    };

    const handleDecline = () => {
      axios
        .post(`http://localhost:9000/api/calendar/accecpt/${userId}`, request)
        .then(window.location.reload())
        .catch((error) => {
          console.error(error);
        });
    };

    return (
      <div
        className="received-req-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={`/profile/${request.sender.id}`} className="sender-details">
          <img
            src={request.sender.propic}
            alt="Profile Picture"
            className="profile-picture"
          />
          <span>{request.sender.userName}</span>
        </Link>
        <div className="watch-req-message">{request.message}</div>
        <div className="watch-req-status">{request.status}</div>
        <button
          className="watch-req-accept-button"
          onClick={() => {
            handleAccept();
          }}
        >
          Accept
        </button>
        <button
          className="watch-req-decline-button"
          onClick={() => {
            handleDecline();
          }}
        >
          decline
        </button>
      </div>
    );
  };

  const SentContainer = (req) => {
    const request = req.request;
    return (
      <div className="sent-req-container">
        <Link
          to={`/profile/${request.receiver.id}`}
          className="receiver-details"
        >
          <img
            src={request.receiver.propic}
            alt="Profile Picture"
            className="profile-picture"
          />
          <span>{request.receiver.userName}</span>
        </Link>
        <div className="watch-req-message">{request.message}</div>
        <div className="watch-req-status">{request.status}</div>
      </div>
    );
  };

  return (
    <>
      <TopSection />
      <>
        <>
          <div className="received-watchreq-list">
            <h1>Received Requests</h1>
            {receivedRequests
              .filter((request) => request.status == "pending")
              .map((request) => (
                <ReceivedContainer key={request._id} request={request} />
              ))}
          </div>

          <div className="sent-watchreq-list">
            <h1>Sent Requests</h1>
            {sentRequests
              .filter((request) => request.status != "accepted")
              .map((request) => (
                <SentContainer key={request._id} request={request} />
              ))}
          </div>
        </>
        <div className="calendar-container">
          <div className="calendar">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "",
              }}
              initialView="timeGridWeek"
              editable={false}
              selectable={false}
              selectMirror={false}
              dayMaxEvents={true}
              weekends={true}
              events={[...initialEvents,event]}
              eventContent={renderEventContent}
              //events={getInitialEvents+event}
            />
          </div>
        </div>
      </>
    </>
  );
};

export default WatchRequestsListPage;
