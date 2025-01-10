import React from "react";
import "./loader.css";
const LoaderPage = () => {
  return (
    <div className="load-container ">
      <div className="loader">
        <span></span>
      </div>
      <div className="loader">
        <span></span>
      </div>
      <div className="loader">
        <i></i>
      </div>
      <div className="loader">
        <i></i>
      </div>
    </div>
  );
};

export default LoaderPage;
