import React from "react";
//import { Link } from "react-router-dom";

export const Pbutton = props => (
  <button onClick={props.onClick} type={props.type}>
    <div className="button">
      <span className="button__mask"></span>
      <span className="button__text">{props.contenido}</span>
      <span className="button__text button__text--bis">{props.contenido}</span>
    </div>
  </button>
);
