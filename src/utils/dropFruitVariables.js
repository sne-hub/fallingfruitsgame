const dropFruitVariables = (fruits, canvas) => {
  const droppedFruit = fruits[parseInt(Math.random() * fruits.length)];
  let canvasWidth, canvasHeight;
  const hero = document.getElementById("hero");
  const fruit = document.createElement("img");

  if (canvas) {
    canvasWidth = canvas.getClientRects()[0].width - 155;
    canvasHeight = canvas.getClientRects()[0].height - 155;
    fruit.width = 50;
    fruit.style.position = "absolute";
    fruit.style.left = Math.random() * canvasWidth + "px";
    fruit.style.top = "0px";
    fruit.style.bottom = canvasHeight + "px";
    
    if (droppedFruit) {
      fruit.src = droppedFruit.src;
      fruit.alt = droppedFruit.alt;
    }
  }

  return { hero, fruit, droppedFruit, canvasHeight };
};

export default dropFruitVariables;
