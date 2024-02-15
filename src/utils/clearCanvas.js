function clearCanvas(dropFruitIntervals, canvasRef) {
  canvasRef.current.innerHTML = "";
  for (const i in dropFruitIntervals) {
    clearInterval(dropFruitIntervals[i]);
  }
}

export default clearCanvas;
