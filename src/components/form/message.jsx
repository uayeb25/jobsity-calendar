/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const Warning = ({ message }) => {
  return (
    <div className="time-warning">
      <span>
        <img src="images/warning.svg" width="20" />
        {message}
      </span>
    </div>
  );
};

export default Warning;
