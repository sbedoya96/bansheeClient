import React from "react";
import { Link } from "react-router-dom";
export const Back = props => (
  <Link to={props.to}>
    <div className="backBtn">
      <span className="line tLine"></span>
      <span className="line mLine"></span>
      <span className="label">atras</span>
      <span className="line bLine"></span>
    </div>
  </Link>
);
