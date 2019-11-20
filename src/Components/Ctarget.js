import React from "react";

export const Ctarget = props => (
  <div className="page">
    <div className="page__toggle">
      <label className="toggle">
        <input className="toggle__input" type="checkbox" />
        <span className="toggle__label">
          <span className="toggle__text">
            {" "}
            {props.text} <span>{props.fecha}</span>{" "}
          </span>
        </span>
      </label>
    </div>
  </div>
);
