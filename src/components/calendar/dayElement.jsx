import React from "react";

import times from "../../fakeservices/time";

const DayElement = ({ day, daySelected, updateDaySelected, reminders }) => {
  const x = (s) => updateDaySelected(s);
  return (
    <div
      className={`${
        day.toDateString() === daySelected ? "day-selected" : "calendar-day"
      }`}
      value={day.toDateString()}
      onClick={() => x(day.toDateString())}
    >
      <span className="day" value={day.toDateString()}>
        {day.toDateString().split(" ")[2]}{" "}
      </span>
      <div className="preview" value={day.toDateString()}>
        {reminders[day.toDateString()] && (
          <>
            {reminders[day.toDateString()].slice(0, 3).map((element, index) => (
              <span key={index} className="preview-detail">
                {times[element.start].time}
              </span>
            ))}
            {reminders[day.toDateString()].length > 3 && (
              <span className="preview-detail">...</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default DayElement;
