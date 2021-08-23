import React from "react";
import { Link } from "react-router-dom";
import img404 from "../assets/Saly-11.png";

import "./page404.scss";

export default function Page404() {
  return (
    <div className="page-404__wrapper">
      <div className="page-404">
        <div className="page-404__text">
          <h2>Whops! Page you are trying to acess doesn't exist anymore.</h2>
          <p>
            Try going back to <Link to="/">Home</Link>
          </p>
        </div>
        <div className="page-404__img">
          <img src={img404} alt="404 error" />
        </div>
      </div>
    </div>
  );
}
