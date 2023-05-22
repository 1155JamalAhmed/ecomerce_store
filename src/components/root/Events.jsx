import React from "react";
import styles from "../../styles/styles";
import EventCard from "../cards/EventCard";
const Events = () => {
  return (
    <div className={`${styles.section}`}>
      <h1 className={`${styles.heading}`}>Popular Event</h1>
      <div className="w-full grid">
        <EventCard />
      </div>
    </div>
  );
};

export default Events;
