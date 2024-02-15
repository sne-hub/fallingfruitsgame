const fruitEaten = (fruit, hero) => {
  const fruitPosition = splitPx(fruit.style.left);
  const heroPositionStart = splitPx(hero.style.left);
  const heroPositionEnd = heroPositionStart + hero.getClientRects()[0].width;

  return fruitPosition > heroPositionStart && fruitPosition < heroPositionEnd;
};

function splitPx(position) {
  return parseInt(position.split("px")[0]);
}

export default fruitEaten;
