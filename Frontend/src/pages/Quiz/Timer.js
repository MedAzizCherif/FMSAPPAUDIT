import React from "react";
import Timer from "react-compound-timer";
import { connect } from "react-redux";
import { timeOut }  from "../../actions/QuestionAction";



const TimerCount = (props) => {

  const timeHandle = (time) => {
    props.timeOut(time);
  };

  return (
    <div>
      
      <Timer
        initialTime={60000 * 10}
        startImmediately={true}
        direction="backward"
      >
        {({ getTime }) => (
          <React.Fragment>
            <div>
              <p>
                <span className="timer_text">
                  {" "}
                  <Timer.Minutes />
                </span>
                <span className="timee_m"> m :</span>
                <span className="timer_text">
                  {" "}
                  <Timer.Seconds />{" "}
                </span>{" "}
                <span className="timee_m"> s</span>
              </p>
            </div>
            <div>{timeHandle(getTime())}</div>
            <br />
          </React.Fragment>
        )}
      </Timer>
    </div>
  );
};

export default connect(null, { timeOut })(TimerCount);
