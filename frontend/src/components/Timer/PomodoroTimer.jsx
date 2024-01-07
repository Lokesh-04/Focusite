import React, { useState, useEffect } from "react";
import "../Timer/PomodoroTimer.css";

function PomodoroTimer() {
  const [timerMode, setTimerMode] = useState("work");
  const [minutesLeft, setMinutesLeft] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [cycles, setCycles] = useState(1);

  useEffect(() => {
    if (timerMode == "work") {
      setMinutesLeft(25);
      setSecondsLeft(0);
    } else if (timerMode == "break") {
      setMinutesLeft(5);
      setSecondsLeft(0);
    } else {
      //longBreak
      setMinutesLeft(15);
      setSecondsLeft(0);
    }
  }, [timerMode]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        if (secondsLeft == 0 && minutesLeft == 0 && timerMode == "work") {
          setTimerMode("break");
        } else if (
          secondsLeft == 0 &&
          minutesLeft == 0 &&
          timerMode == "break"
        ) {
          if (cycles == 2) {
            //add variable for target cycles of work->break->work......
            setTimerMode("longBreak");
          } else {
            setTimerMode("work");
            setCycles(cycles + 1);
          }
        }

        if (secondsLeft == 0) {
          setSecondsLeft(59);
          setMinutesLeft((minutesLeft) => minutesLeft - 1);
          setSecondsLeft((secondsLeft) => secondsLeft - 1);
        } else {
          setSecondsLeft((secondsLeft) => secondsLeft - 1);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPaused, minutesLeft, secondsLeft]);

  function handleStart() {
    setIsPaused(false);
  }

  function handlePause() {
    setIsPaused(true);
  }

  function handleReset() {
    setMinutesLeft(25);
    setSecondsLeft(0);
    setIsPaused(true);
  }

  return (
    <div id="pomodoro">
      <div id="timers">
        <button
          className="timer"
          id="work"
          onClick={() => {
            setTimerMode("work");
          }}
        >
          work
        </button>
        <button
          className="timer"
          id="break"
          onClick={() => {
            setTimerMode("break");
          }}
        >
          break
        </button>
        <button
          className="timer"
          id="longbreak"
          onClick={() => {
            setTimerMode("longBreak");
          }}
        >
          long break
        </button>
      </div>

      <div id="circle">
        <div id="time">
          {minutesLeft}:{secondsLeft}
        </div>

        <div id="controls">
          <button className="control" onClick={handleStart}>Start</button>
          <button className="control" onClick={handlePause}>Pause</button>
          <button className="control" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer;
