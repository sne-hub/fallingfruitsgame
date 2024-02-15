import Confetti from "react-confetti";

const WinningModal = () => {
  return (
    <div className="gameWon" data-testid="confetti">
      <Confetti
        width={window.innerWidth * 0.72}
        height={window.innerHeight * 0.95}
      />
      <h1>Congrats! you won</h1>
    </div>
  );
};

export default WinningModal;
