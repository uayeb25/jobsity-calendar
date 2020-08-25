/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";

import { SETTINGS } from "../../utils/env";

import Warning from "./message";
import times from "../../fakeservices/time";
import { getWeatherInformation } from "../../services/weather";

const Form = ({
  hideForm,
  daySelected,
  reminders,
  updateReminders,
  creating,
  editing,
}) => {
  const [warningDuration, setWarningDuration] = useState(false);
  const [warningForm, setWarningForm] = useState(false);

  const [timeTo, setTimeTo] = useState(!creating ? times : []);

  const [priority, setPriority] = useState(
    !creating ? reminders[daySelected][editing].priority : "green"
  );
  const [timeFromValue, setTimeFromValue] = useState(
    !creating ? reminders[daySelected][editing].start : -1
  );
  const [timeToValue, setTimeToValue] = useState(
    !creating ? reminders[daySelected][editing].end : -1
  );
  const [duration, setDuration] = useState(
    !creating ? reminders[daySelected][editing].duration : "---"
  );
  const [city, setCity] = useState(
    !creating ? reminders[daySelected][editing].city : ""
  );
  const [weather, setWeather] = useState(
    !creating ? reminders[daySelected][editing].weather : "---"
  );
  const [temperature, setTemperature] = useState(
    !creating ? reminders[daySelected][editing].temperature : "---"
  );
  const [subject, setSubject] = useState(
    !creating ? reminders[daySelected][editing].subject : ""
  );
  const [content, setContent] = useState(
    !creating ? reminders[daySelected][editing].content : ""
  );

  const handleTimeStart = (e) => {
    setTimeTo(times.slice(parseInt(e.target.value) + 1, times.length));
    setTimeFromValue(parseInt(e.target.value));
  };

  const handleTimeEnd = (e) => {
    setTimeToValue(parseInt(e.target.value));
    setDuration(`${(parseInt(e.target.value) - timeFromValue) * 0.5} hours`);
  };

  const retrieveInformation = () => {
    if (city.length > 0) {
      getWeatherInformation(city)
        .then((info) => {
          setWeather(info.data.weather[0].main);
          setTemperature(info.data.main.temp);
        })
        .catch((err) => {
          setWeather("NOT FOUND");
          setTemperature("NOT FOUND");
        });
    }
  };

  const storeRecord = () => {
    console.log(reminders);
    if (
      SETTINGS.words - content.length > 30 ||
      duration.length <= 3 ||
      city.length === 0 ||
      subject.length === 0
    ) {
      setWarningForm(true);
    } else {
      setWarningForm(false);

      if (creating) {
        if (reminders[daySelected])
          reminders[daySelected].push({
            subject: subject,
            content: content,
            priority: priority,
            start: timeFromValue,
            end: timeToValue,
            duration: duration,
            city: city,
            weather: weather,
            temperature: temperature,
          });
        else
          reminders[daySelected] = [
            {
              subject: subject,
              content: content,
              priority: priority,
              start: timeFromValue,
              end: timeToValue,
              duration: duration,
              city: city,
              weather: weather,
              temperature: temperature,
            },
          ];
        reminders[daySelected].sort((a, b) => a.start - b.start);
        updateReminders(reminders);
        hideForm(true);
      } else {
        reminders[daySelected][editing] = {
          subject: subject,
          content: content,
          priority: priority,
          start: timeFromValue,
          end: timeToValue,
          duration: duration,
          city: city,
          weather: weather,
          temperature: temperature,
        };
        reminders[daySelected].sort((a, b) => a.start - b.start);
        updateReminders(reminders);
        hideForm(true);
      }
    }
  };

  return (
    <div className="job-form">
      <div className="form-title">
        <span>Date picked: {daySelected}</span>
      </div>

      <div className="form-close" onClick={hideForm}>
        <span className="info-agenda">X</span>
      </div>

      {warningForm && (
        <Warning
          message={`Complete all the information${
            SETTINGS.words - content.length < 0
              ? ", Content allows only 30 chars"
              : ""
          }`}
        />
      )}

      <div className="element">
        <span> Subject</span>
      </div>

      <div className="element form-element">
        <input
          className="form-element"
          defaultValue={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="element content-label">
        <span>
          {" "}
          Content, remaining words: {SETTINGS.words - content.length}
        </span>
      </div>

      <div className="element form-element">
        <textarea
          className="form-element"
          cols="5"
          onChange={(e) => setContent(e.target.value)}
          defaultValue={content}
        ></textarea>
      </div>

      <div className="element ">
        <span> Click reminder's Priority</span>
      </div>

      <div
        onClick={() => setPriority("green")}
        className={`color ${priority === "green" ? "clicked" : ""}`}
      >
        <span className="green"></span>
      </div>

      <div
        onClick={() => setPriority("orange")}
        className={`color ${priority === "orange" ? "clicked" : ""}`}
      >
        <span className="orange"></span>
      </div>

      <div
        onClick={() => setPriority("red")}
        className={`color ${priority === "red" ? "clicked" : ""}`}
      >
        <span className="red"></span>
      </div>

      <div className="time-label">
        <span> Beging </span>
      </div>

      <div className="time-label">
        <span> End </span>
      </div>

      <div className="time-label">
        <span> Duration </span>
      </div>

      <div className="time">
        <select
          onChange={handleTimeStart}
          className="form-element"
          value={timeFromValue}
        >
          {times.map((element, index) => (
            <option key={index} value={element.id}>
              {element.time}
            </option>
          ))}
        </select>
      </div>

      <div className="time">
        <select
          onChange={handleTimeEnd}
          className="form-element"
          value={timeToValue}
        >
          {timeTo.map((element, index) => (
            <option key={index} value={element.id}>
              {element.time}
            </option>
          ))}
        </select>
      </div>

      <div className="time-duration">{duration}</div>

      {warningDuration && (
        <Warning message="You have another reminders at the same time" />
      )}

      <div className="time-label">
        <span> City </span>
      </div>

      <div className="time-label">
        <span> weather </span>
      </div>

      <div className="time-label">
        <span> Temperature </span>
      </div>

      <div className="time">
        <input
          defaultValue={city}
          className="city"
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="city" onClick={retrieveInformation}>
          I'm lucky
        </button>
      </div>

      <div className="time-duration">{weather}</div>

      <div className="time-duration">{temperature}</div>

      <button onClick={storeRecord}>Save</button>
    </div>
  );
};

export default Form;
