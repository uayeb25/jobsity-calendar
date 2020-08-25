/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const Modal = ({ message, doYes, doNo }) => {
  return (
    <div className="warnig-modal">
      <img src="images/warning.svg" />
      <p>{message}</p>
      <p>
        <span>
          <span className="modal-action" onClick={doNo}>
            No
          </span>
          <span className="modal-action" onClick={doYes}>
            Yes
          </span>
        </span>
      </p>
    </div>
  );
};

export default Modal;
