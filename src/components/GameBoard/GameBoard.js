import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import Allergy from "../Allergy/Allergy";
import Canvas from "../Canvas/Canvas";
import dropFruitVariables from "../../utils/dropFruitVariables";
import fruitEaten from "../../utils/fruitEaten";
import clearCanvas from "../../utils/clearCanvas";
import {
  fetchDataRequest,
  setGameOver,
  decreaseLives,
  increaseScore,
  setEatenFruit,
  addToDropFruitIntervals,
} from "../../redux/slice";
import StartNewGameButton from "../StartNewGameButton/StartNewGameButton";

const GameBoard = () => {
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(60);
  const score = useSelector((state) => state.score);
  const lives = useSelector((state) => state.lives);
  const allergyFruit = useSelector((state) => state.allergyFruit);
  const isPlaying = useSelector((state) => state.isPlaying);
  const gameOver = useSelector((state) => state.gameOver);
  const canvasRef = useRef(null);
  const fruits = useSelector((state) => state.fruits);
  const gameWon = useSelector((state) => state.gameWon);
  const dropFruitIntervals = useSelector((state) => state.dropFruitIntervals);
  const livesArray = [];

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  const dropFruit = () => {
    let dropFruitInterval;
    if (isPlaying) {
      const { hero, fruit, droppedFruit, canvasHeight } = dropFruitVariables(
        fruits,
        canvasRef.current
      );
      if (canvasRef.current) canvasRef.current.appendChild(fruit);

      dropFruitInterval = setInterval(() => {
        const height = parseInt(fruit.style.top.split("px")[0]);
        const eatenFruit = fruitEaten(fruit, hero, canvasHeight);
        if (height < canvasHeight) {
          fruit.style.top = height + 30 + "px";
        } else {
          if (eatenFruit) {
            dispatch(setEatenFruit(droppedFruit));
            dispatch(decreaseLives());
            dispatch(increaseScore());
            dispatch(setGameOver());
          }
          fruit.remove();
          clearInterval(dropFruitInterval);
        }
      }, 150);
      dispatch(addToDropFruitIntervals(dropFruitInterval));
    }
  };

  const startNewGame = () => {
    if (canvasRef.current) {
      if (!canvasRef.current.innerHTML) {
        setInterval(() => {
          dropFruit();
        }, 500);
      } else {
        clearInterval();
        clearCanvas(dropFruitIntervals, canvasRef);
      }
    }
  };

  const handleStartNewGameButtonClick = () => {
    canvasRef.current.focus();
    document.getElementById("hero").style = {
      left: "0px",
      transform: "scaleX(-1)",
    };
  };

  for (let i = 0; i < lives; i++) {
    livesArray.push("/img/heart.png");
  }

  return (
    <div className="board" data-testid="game-board-id">
      <div className="allergy-container">
        <Allergy livesArray={livesArray} allergyFruit={allergyFruit} />
        <div className="allergy">
          <h3>Score: {score}</h3>
          <h3>
            Time Remaining:{" "}
            {Math.floor(seconds / 60)
              .toString()
              .padStart(2, "0")}
            :{(seconds % 60).toString().padStart(2, "0")} s
          </h3>
        </div>
        <StartNewGameButton
          startNewGame={startNewGame}
          handleStartNewGameButtonClick={handleStartNewGameButtonClick}
          seconds={seconds}
          setSeconds={setSeconds}
          gameOver={gameOver}
          gameWon={gameWon}
        />
      </div>
      <Canvas
        canvasRef={canvasRef}
        gameOver={gameOver}
        gameWon={gameWon}
        dropFruitIntervals={dropFruitIntervals}
      />
    </div>
  );
};

export default GameBoard;
