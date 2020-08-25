/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";

import Header from "../components/header";
import JobSityCalendar from "../components/calendar/calendar";
import Card from "../components/card";
import List from "../components/list";
import Modal from "../components/modal";
import Form from "../components/form/form";

const Dashboard = () => {
  const currentDate = new Date();
  const [firstDay, setFirstDay] = useState(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  );
  const [daySelected, setDaySelected] = useState(currentDate.toDateString());

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [flagDeleteAll, setFlagDeleteAll] = useState(false);
  const [index, setIndex] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [creting, setCreating] = useState(false);
  const [editing, setEditing] = useState(-1);

  const [reminders, setReminders] = useState({});

  const moveMonth = (n) => {
    let new_date = new Date(
      firstDay.setDate(firstDay.getDate() + (n === 1 ? 40 : -10))
    );
    setFirstDay(new Date(new_date.getFullYear(), new_date.getMonth(), 1));
  };

  const moveToday = () => {
    setFirstDay(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
    setDaySelected(currentDate.toDateString());
  };

  const handleCreating = (val) => {
    setEditing(-1);
    setCreating(val);
    setShowForm(val);
  };

  const handleEditing = (val) => {
    setEditing(val);
    setCreating(false);
    setShowForm(true);
  };

  const updateReminders = (val) => {
    setReminders(val);
  };

  const activateModal = (message, flagDeleteAll, index) => {
    setShowModal(true);
    setFlagDeleteAll(flagDeleteAll);
    setModalMessage(message);
    setIndex(index);
  };

  const deleteAll = () => {
    reminders[daySelected] = undefined;
    setReminders(reminders);
    setShowModal(false);
  };

  const deleteOne = () => {
    reminders[daySelected].splice(index, 1);
    setReminders(reminders);
    setShowModal(false);
  };

  return (
    <main>
      <Header />
      <JobSityCalendar
        currentDate={currentDate}
        firstDay={firstDay}
        daySelected={daySelected}
        moveMonth={moveMonth}
        moveToday={moveToday}
        updateSelect={(d) => setDaySelected(d)}
        reminders={reminders}
      />
      {!showForm && (
        <>
          <Card
            title={daySelected.split(" ")[1]}
            info={daySelected.split(" ")[2]}
          />
          <Card title="Year" info={daySelected.split(" ")[3]} />
          {!showModal && (
            <List
              NewReminder={() => handleCreating(true)}
              EditReminder={handleEditing}
              reminders={reminders}
              daySelected={daySelected}
              activateModal={activateModal}
            />
          )}
          {showModal && (
            <Modal
              message={modalMessage}
              doYes={() => (flagDeleteAll ? deleteAll() : deleteOne())}
              doNo={() => setShowModal(false)}
            />
          )}
        </>
      )}
      {showForm && (
        <Form
          reminders={reminders}
          updateReminders={updateReminders}
          daySelected={daySelected}
          hideForm={() => handleCreating(false)}
          creating={creting}
          editing={editing}
        />
      )}
    </main>
  );
};

export default Dashboard;
