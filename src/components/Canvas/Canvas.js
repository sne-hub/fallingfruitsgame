import { useDispatch, useSelector } from "react-redux";
import { moveLeft, moveRight } from "../../redux/slice";
import Hero from "../Hero/Hero";
import WinningModal from "../WinningModal/WinningModal";
import { useEffect } from "react";
import clearCanvas from "../../utils/clearCanvas";

const Canvas = ({ canvasRef, gameOver, gameWon, dropFruitIntervals }) => {
  const dispatch = useDispatch();
  const position = useSelector((state) => state.position);

  const heroMoves = (e) => {
    const hero = document.getElementById("hero");
    const parentElement = hero.parentElement;
    const parentWidth = parentElement.getClientRects()[0].width*0.95;
    if (e.key === "a" || e.key === "ArrowLeft") {
      hero.style.transform = "scaleX(1)";
      dispatch(moveLeft());
    } else if (e.key === "d" || e.key === "ArrowRight") {
      if (position < parentWidth - 155) {
        dispatch(moveRight());
      }
      hero.style.transform = "scaleX(-1)";
    }
    hero.style.left = position + "px";
  };

  useEffect(() => {
    if (gameOver || gameWon) {
      clearCanvas(dropFruitIntervals, canvasRef);
    }
  }, [canvasRef, dropFruitIntervals, gameOver, gameWon]);

  return (
    <div className="hero-section">
      <div
        id="canvas"
        data-testid="canvas"
        ref={canvasRef}
        tabIndex={0}
        onKeyDown={heroMoves}></div>
      {gameOver && !gameWon && (
        <div
          width={window.innerWidth * 0.6}
          className="gameOver"
          data-testid="game-over"
          style={{ display: gameOver }}>
          <h1>GAME OVER</h1>
        </div>
      )}
      {gameWon && !gameOver && <WinningModal />}
      <Hero />
    </div>
  );
};

export default Canvas;
