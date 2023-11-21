import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar(id) {
  const userId = id.id;
  const [currentEvents, setCurrentEvents] = useState([]);

  const { user } = useContext(AuthContext);

  const getInitialEvents = async () => {
    let initialEvents = [];
    await axios
      .get(`http://localhost:9000/api/calendar/getEvents/${userId}`)
      .then((res) => {initialEvents = res.data;
      console.log(res);console.log(initialEvents);})
      .catch((error) => {
        console.log(error);
      });
      console.log(initialEvents);
    return initialEvents;
  };

  const handleDateSelect = async (selectInfo) => {
    let title = prompt("Please enter event title");
    let calendarApi = selectInfo.view.calendar;
    if (title) {
      const newEvent = {
        title,
        start: selectInfo.start,
        end: selectInfo.end,
        type: "pending",
        allDay: selectInfo.allDay,
        _id: "",
      };

      await axios
        .post(`http://localhost:9000/api/calendar/addEvent/${userId}`, {
          event: {
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end,
            type: newEvent.type,
            allDay: newEvent.allDay
          },
        })
        .then((res) => {
          newEvent._id = res.data;
          calendarApi.unselect();
          calendarApi.addEvent(newEvent);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    calendarApi.unselect();
  };

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Do you want to delete the event? '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className="event-content">
        <i>{eventInfo.event.title}</i>
      </div>
    );
  };

  const handleEventRemove = async (eventInfo) => {
    await axios
      .post(`http://localhost:9000/api/calendar/removeEvent/${user._id}`, {
        eventId: eventInfo.event.extendedProps._id
      })
      .then((res) => {
        console.log(res);
      })
      .then(console.log(eventInfo))
      .catch((error) => {
        console.log(error);
      }); 
  };

  return (
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
          selectable={(userId==user._id)}
          selectMirror={(userId==user._id)}
          dayMaxEvents={true}
          weekends={true}
          initialEvents={getInitialEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={(userId==user._id)&&handleEventClick}
          eventsSet={handleEvents}
          eventChange={() => {}}
          eventRemove={handleEventRemove}
        />
      </div>
    </div>
  );
}

export default Calendar;
