import React from "react";
import "./PageTransition.css";

const PageTransition = ({ isTransitioning }) => {
  return (
    <div className={`page-transition ${isTransitioning ? "active" : ""}`}>
      <div className="cat-walk">
        <div className="cat-body">
          <div className="cat-head">
            <div className="cat-ears">
              <div className="ear left"></div>
              <div className="ear right"></div>
            </div>
            <div className="cat-face">
              <div className="cat-eyes">
                <div className="eye left"></div>
                <div className="eye right"></div>
              </div>
              <div className="cat-nose"></div>
              <div className="cat-whiskers">
                <div className="whisker left"></div>
                <div className="whisker right"></div>
              </div>
            </div>
          </div>
          <div className="cat-tail"></div>
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
