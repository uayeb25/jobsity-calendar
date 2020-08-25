/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";

import GrayDay from "./grayday";
import DayElement from "./dayElement";

const JobSityCalendar = ({
  firstDay,
  updateSelect,
  daySelected,
  moveMonth,
  moveToday,
  reminders,
}) => {
  const [filled, setFilled] = useState(0);

  const [fillGraySection, setfillGraySection] = useState(true);
  const [graysBegin, setGraysBegin] = useState([]);

  const [fillDays, setFillDays] = useState(false);
  const [days, setDays] = useState([]);

  const [fillGraySectionEnd, setfillGraySectionEnd] = useState(false);
  const [graysEnd, setGraysEnd] = useState([]);
  const orderDays = [7, 1, 2, 3, 4, 5, 6];

  const refresh = (n, jump) => {
    if (jump === "narrow") moveMonth(n);
    else moveToday();
    setGraysBegin([]);
    setDays([]);
    setGraysEnd([]);
    setfillGraySection(true);
  };

  useEffect(() => {
    const startAt = firstDay.getDay();
    let n = 0;
    if (fillGraySection) {
      for (let day of orderDays) {
        if (startAt !== day) {
          graysBegin.push(day);
          n++;
        } else {
          break;
        }
      }
      setFilled(n);
      setGraysBegin(graysBegin);
      setfillGraySection(false);
      setFillDays(true);
    }
  }, [orderDays, fillGraySection, graysBegin, firstDay, filled]);

  useEffect(() => {
    if (fillDays & !fillGraySection) {
      const month = firstDay.getMonth();
      let n = filled;
      let fd = new Date(firstDay);
      while (month === fd.getMonth()) {
        days.push(new Date(fd));
        n++;
        fd.setDate(fd.getDate() + 1);
      }
      setFilled(n);
      setDays(days);
      setFillDays(false);
      setfillGraySectionEnd(true);
    }
  }, [fillGraySection, fillDays, days, filled, firstDay]);

  useEffect(() => {
    if (!fillDays && !fillGraySection && fillGraySectionEnd) {
      let n = filled;
      for (let i = filled; i < 6 * 7; i++) {
        graysEnd.push(i);
        n++;
      }
      setGraysEnd(graysEnd);
      setFilled(n);
      setfillGraySectionEnd(false);
    }
  }, [fillDays, fillGraySectionEnd, fillGraySection, filled, graysEnd]);

  return (
    <div className="calendar">
      {/* Header */}
      <div className="calendar-header">
        {firstDay.toDateString().split(" ")[1]},
        {firstDay.toDateString().split(" ")[3]}
      </div>
      <div className="calendar-header" onClick={() => refresh(1, "today")}>
        <span className="info-agenda">today</span>
      </div>
      <div className="calendar-header" onClick={() => refresh(-1, "narrow")}>
        <span className="info-agenda">
          <img src="images/up.svg" />
        </span>
      </div>
      <div className="calendar-header" onClick={() => refresh(1, "narrow")}>
        <span className="info-agenda">
          <img src="images/down.svg" />
        </span>
      </div>
      <div className="calendar-header">Sunday</div>
      <div className="calendar-header">Monday</div>
      <div className="calendar-header">Tuesday</div>
      <div className="calendar-header">Wednesday</div>
      <div className="calendar-header">Thursday</div>
      <div className="calendar-header">Friday</div>
      <div className="calendar-header">Saturday</div>
      {/**/}

      {!fillGraySection && graysBegin.length > 0 && (
        <>
          {graysBegin.map((element, index) => (
            <GrayDay key={`Gray${index}Start`} />
          ))}
        </>
      )}

      {!fillDays && days.length > 0 && (
        <>
          {days.map((element, index) => (
            <DayElement
              key={`Day${index}Calendar`}
              day={element}
              daySelected={daySelected}
              updateDaySelected={updateSelect}
              reminders={reminders}
            />
          ))}
        </>
      )}

      {!fillGraySectionEnd && graysEnd.length > 0 && (
        <>
          {graysEnd.map((element, index) => (
            <GrayDay key={`Gray${index}End`} />
          ))}
        </>
      )}
    </div>
  );
};

export default JobSityCalendar;
