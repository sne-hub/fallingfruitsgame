import { useEffect, useState } from "react";
import { fetchDataRequest, resetGame, stopTimer } from "../../redux/slice";
import { useDispatch } from "react-redux";

const StartNewGameButton = ({
  startNewGame,
  handleStartNewGameButtonClick,
  seconds,
  setSeconds,
  gameOver,
  gameWon,
}) => {
  const dispatch = useDispatch();
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    let timer;

    if (timerStarted && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    if (seconds === 0) {
      clearInterval(timer);
      dispatch(stopTimer());
    }

    if (gameOver) {
      setTimerStarted(false);
    }

    return () => clearInterval(timer);
  }, [dispatch, timerStarted, seconds, setSeconds, gameOver]);

  const startTimer = () => {
    setTimerStarted(true);
    setSeconds(60);
  };

  return (
    <div className="allergy">
      <button
        onClick={() => {
          if (timerStarted || gameOver || gameWon) {
            dispatch(resetGame());
            dispatch(fetchDataRequest());
          }
          startNewGame();
          startTimer();
          handleStartNewGameButtonClick();
        }}>
        Start-New-Game
      </button>
    </div>
  );
};

export default StartNewGameButton;
