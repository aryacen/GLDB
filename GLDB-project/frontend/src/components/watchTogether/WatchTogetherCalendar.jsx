import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function WatchTogetherCalendar(id) {
  const userId = id.id;
  const [currentEvents, setCurrentEvents] = useState([]);
  const { user } = useContext(AuthContext);
  const [friend, setFriend] = useState({});
  const [sender, setSender] = useState({});
  const [timeSelected, setTimeSelected] = useState(false);
  const [watchTogetherEvent, setWatchTogetherEvent] = useState({});
  const [secondStep, setSecondStep] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  const getInitialEvents = async () => {
    let initialEvents = [];
    await axios
      .get(`http://localhost:9000/api/calendar/getEvents/${userId}`)
      .then((res) => {
        res.data.map((event) => {
          initialEvents.push({
            ...event,
            color: "#4a9486",
          });
        });
        console.log(initialEvents);
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(`http://localhost:9000/api/calendar/getEvents/${user._id}`)
      .then((res) => {
        res.data.map((event) => {
          initialEvents.push({
            ...event,
            color: "#0098ff",
          });
        });
        console.log(initialEvents);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(initialEvents);
    return initialEvents;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/users/${userId}`)
      .then((response) => {
        setFriend({
          id:userId,
          propic:response.data.profile_picture,
          userName:response.data.username
        })
      })
      .catch((error) => {
        console.error(error);
      });

      axios
      .get(`http://localhost:9000/api/users/${user._id}`)
      .then((response) => {
        setSender({
          id:user._id,
          propic:response.data.profile_picture,
          userName:response.data.username
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDateSelect = async (selectInfo) => {
    let confirm = window.confirm("Are you sure to choose this time?");
    let calendarApi = selectInfo.view.calendar;
    if (timeSelected) {
      calendarApi.getEventById("WatchTogetherEvent").remove();
    }
    if (confirm) {
      const newEvent = {
        title: `Watch Together ${sender.userName}-${friend.userName}`,
        start: selectInfo.start,
        end: selectInfo.end,
        type: "pending",
        allDay: selectInfo.allDay,
        id: "WatchTogetherEvent",
        editable: true,
        eventId: "",
      };
      setTimeSelected(true);
      calendarApi.addEvent(newEvent);
      setWatchTogetherEvent(newEvent);
    }
    calendarApi.unselect();
  };

  const handleTimeChange = (eventInfo) => {
    if (window.confirm("Do you want to change to this time?")) {
      setWatchTogetherEvent(eventInfo);
    } else {
      eventInfo.revert();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventInfo) => {
    if (eventInfo.hoster == user._id) {
      return (
        <div>
          <i>{eventInfo.event.title}</i>
        </div>
      );
    } else {
      return (
        <div>
          <i>{eventInfo.event.title}</i>
        </div>
      );
    }
  };

  const handleSend = () => {
    const newRequest = {
      sender: sender,
      receiver: friend,
      message: message,
      event: watchTogetherEvent,
      status: "pending",
    };

    axios
      .post(`http://localhost:9000/api/calendar/addRequest`, newRequest)
      .then((response) => {
        if (response.data.success) {
          setRequestSent(true);
        } else {
          setFailed(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!secondStep ? (
        <>
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
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                initialEvents={getInitialEvents}
                select={handleDateSelect}
                eventContent={renderEventContent}
                eventClick={() => {}}
                eventsSet={handleEvents}
                eventChange={handleTimeChange}
                eventRemove={() => {}}
              />
            </div>
          </div>
          <span className="legend-self">Your Events </span>
          <span className="legend-friend">Friend's Events </span>
          <button
            onClick={() => {
              if (timeSelected) {
                setSecondStep(true);
              } else {
                window.confirm("Please select a time.");
              }
            }}
          >
            Next
          </button>
        </>
      ) : (
        <>
          {requestSent ? (
            <>
              <h1>Request Sent</h1>
              <button
                onClick={() => {
                  navigate(`/profile/${userId}`);
                }}
              >
                Back
              </button>
            </>
          ) : (
            <>
              {!failed ? (
                <div className="request-form">
                  <h1>Enter your message</h1>
                  <input
                    className="request-message-input"
                    type="text"
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                    }}
                    required
                  ></input>
                  <button className="request-send-button" onClick={handleSend}>
                    Send
                  </button>
                </div>
              ) : (
                <>
                  <h1>You have unaccepted requests</h1>
                  <button
                    onClick={() => {
                      navigate(`/profile/${userId}`);
                    }}
                  >
                    Back
                  </button>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default WatchTogetherCalendar;
