import React, { useEffect, useState } from "react";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";

dayjs.extend(duration);

const calculateTimeLeft = (endDate) => {
  const diffInMillis = dayjs(endDate).diff(dayjs());
  const remainingDuration = dayjs.duration(diffInMillis);

  let remainingTime = {};
  if (diffInMillis > 0) {
    remainingTime = {
      days: remainingDuration.days(),
      hours: remainingDuration.hours(),
      minutes: remainingDuration.minutes(),
      seconds: remainingDuration.seconds(),
    };
  }
  return remainingTime;
};

const CountDown = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate));

  useEffect(() => {
    let requestId;

    const updateCountdown = () => {
      const newTimeLeft = calculateTimeLeft(endDate);
      setTimeLeft(newTimeLeft);
      if (Object.keys(newTimeLeft).length !== 0) {
        // call the requestAimation to get executed before browser repaint the screen
        requestId = requestAnimationFrame(updateCountdown);
      }
    };

    // start the coutdown
    updateCountdown();

    // clear the animationFrame before calling useEffect again
    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [endDate]);

  const timerComponents = Object.keys(timeLeft).map((interval, index) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-[25px] text-[#475ad2]" key={index}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]"> Time's up</span>
      )}
    </div>
  );
};

export default CountDown;
