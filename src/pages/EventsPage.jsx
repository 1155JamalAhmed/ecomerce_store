import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/layout/Header";
import EventCard from "../components/cards/EventCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Loader from "../components/layout/Loader";
import styles from "../styles/styles";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [firstRender, setFirstRender] = useState(true);

  // first render if have any error and loading
  const [eventsHasError, setEventsHasError] = useState(null);
  const [eventsIsLoading, setEventsIsLoading] = useState(true);

  // Any error occured afterward
  const [eventPageIsLoading, setEventPageIsLoading] = useState(false);
  const [eventPageHasError, setEventPageHasError] = useState(null);

  // the page query parameter
  const [searchParams] = useSearchParams();
  const pageFromParams = +searchParams?.get("page");
  const navigate = useNavigate();

  const fetchEvents = useCallback(
    (pageFromParams) => {
      axiosInstance
        .get(`/events/get-all-events?page=${pageFromParams}&limit=3`)
        .then((res) => {
          setEvents((prevState) => [...prevState, ...res.data.body.events]);
          setTotalEvents(res.data.body.totalEventsCount);
        })
        .catch((err) => {
          firstRender && setEventsHasError(err.response.data.message);
          !firstRender && setEventPageHasError(err.response.data.message);
        })
        .finally(() => {
          firstRender && setEventsIsLoading(false);
          !firstRender && setEventPageIsLoading(false);
        });
    },
    [firstRender]
  );

  // ** check if firstRender and then only execute for the firstRender
  useEffect(() => {
    if (firstRender) {
      searchParams?.set("page", 1);
      navigate(`?${searchParams.toString()}`);
      fetchEvents(1);
      setFirstRender(false);
    }
  }, [fetchEvents, navigate, searchParams, firstRender, setFirstRender]);

  // ** intersectionObserver ==> execute when their are remaining events and events are not loading after first render
  // ** set the query params of page and manage the loading state
  useEffect(() => {
    if (totalEvents > events.length) {
      const options = { root: null, rootMargin: "100px" };
      const bottomInterObserve = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !eventPageIsLoading) {
          searchParams.set("page", pageFromParams + 1);
          navigate(`?${searchParams.toString()}`);
          setEventPageIsLoading(true);
          fetchEvents(pageFromParams + 1);
        }
      }, options);

      if (bottomInterObserve && document.getElementById("bottom-trigger")) {
        bottomInterObserve.observe(document.getElementById("bottom-trigger"));
      }

      return () => {
        if (bottomInterObserve) {
          bottomInterObserve.disconnect();
        }
      };
    }
  }, [
    pageFromParams,
    fetchEvents,
    navigate,
    searchParams,
    eventPageIsLoading,
    totalEvents,
    events,
  ]);

  return (
    <div>
      <Header />
      {eventsIsLoading && <Loader />}

      {!eventsIsLoading && !eventsHasError && (
        <>
          {events.map((event) => (
            <EventCard active={true} data={event} key={event._id} />
          ))}
          <div id="bottom-trigger"></div>
          {eventPageIsLoading && (
            <h1 className={`${styles.heading}`}>Loading more events...</h1>
          )}
          {!eventPageIsLoading && eventPageHasError && (
            <h1 className={`${styles.error}`}>{eventPageHasError}</h1>
          )}
        </>
      )}
      {!eventsIsLoading && eventsHasError && (
        <h1 className={`${styles.error}`}>{eventsHasError}</h1>
      )}
      {!eventsIsLoading && totalEvents === 0 && (
        <h1 className={`${styles.empty}`}>No event is running right now</h1>
      )}
    </div>
  );
};

export default EventsPage;
