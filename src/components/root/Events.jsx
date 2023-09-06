import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import EventCard from "../cards/EventCard";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../layout/Loader";

const Events = () => {
  const [event, setEvent] = useState(null);
  const [eventIsLoading, setEventIsLoading] = useState(true);
  const [eventhasError, setEventhasError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/events/popular-event")
      .then((res) => setEvent(res.data.body))
      .catch((err) => setEventhasError(err.response.data.message))
      .finally(() => setEventIsLoading(false));
  }, []);

  return (
    <div className={`${styles.section}`}>
      <h1 className={`${styles.heading}`}>Popular Event</h1>
      <div className="w-full grid">
        <>
          {event && <EventCard data={event} />}
          {eventIsLoading && <Loader />}
          {eventhasError && !eventIsLoading && (
            <h1 className={`${styles.error}`}>{eventhasError}</h1>
          )}
        </>
      </div>
    </div>
  );
};

export default Events;
