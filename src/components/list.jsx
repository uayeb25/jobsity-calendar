import React from "react";

import times from "../fakeservices/time";

const ListRemindes = ({
  NewReminder,
  EditReminder,
  reminders,
  daySelected,
  activateModal,
}) => {
  return (
    <div className="item-list">
      <header>
        <p>Agenda</p>
        <p>
          <span className="info-agenda" onClick={NewReminder}>
            New reminder
          </span>
          <span
            className="delete-agenda"
            onClick={() =>
              reminders[daySelected]
                ? activateModal(
                    "Do you want to delete ALL the reminders?",
                    true,
                    -1
                  )
                : console.log("Nothing")
            }
          >
            Delete all
          </span>
        </p>
      </header>
      <section>
        {reminders[daySelected] && (
          <>
            {reminders[daySelected].map((element, index) => (
              <div key={index} className="item">
                <div className="item-element">TIME</div>
                <div className="item-element">SUBJECT</div>
                <div className="item-element">PRIORITY</div>
                <div className="item-element"></div>
                <div className="item-element time">
                  {times[element.start].time}
                </div>
                <div className="item-element subject">{element.subject}</div>
                <div className="item-element ">
                  <span className={`${element.priority}`}> </span>
                </div>
                <div className="item-element">
                  <span
                    className="info-agenda"
                    onClick={() => EditReminder(index)}
                  >
                    View
                  </span>
                  <span
                    className="delete-agenda"
                    onClick={() =>
                      activateModal(
                        "Do you want to delelete the reminder selected?",
                        false,
                        index
                      )
                    }
                  >
                    Delete
                  </span>
                </div>
              </div>
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default ListRemindes;
