import React from "react";

const Card = ({ title, info }) => {
  return (
    <div className="widget">
      <p>{title}</p>
      <p>
        <span className="second">{info}</span>
      </p>
    </div>
  );
};

export default Card;
