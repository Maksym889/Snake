let field = document.querySelector(".snake-field");

for (let i = 1; i < 501; i++) {
  elem = document.createElement("div");
  elem.classList.add("markup");
  field.appendChild(elem);
}
let set = document.querySelectorAll(".markup");


let el = document.querySelectorAll(".markup");
let i = 0;
for (let y = 19; y >= 0; y--) {
  for (let x = 0; x < 25; x++) {
    el[i].setAttribute("posX", x);
    el[i].setAttribute("posY", y);
    i++;
  }
}
// добавляем границу поля
for (let i = 0; i < el.length; i++) {
  if (el[i].getAttribute("posY") == 19 || el[i].getAttribute("posY") == 0 || el[i].getAttribute("posX") == 0 || el[i].getAttribute("posX") == 24) {
    el[i].classList.add("limit");
    el[i].classList.remove("markup");
  }
}


let snakeFigure = 0;
// координаты начальной змейки
function creationSnake() {
  let coordinates = [
    [12, 11],
    [12, 10],
    [12, 9],
    [12, 8]
  ];

  snakeFigure = [
    document.querySelector(`[posX="${coordinates[0][0]}"][posY="${coordinates[0][1]}"]`),
    document.querySelector(`[posX="${coordinates[1][0]}"][posY="${coordinates[1][1]}"]`),
    document.querySelector(`[posX="${coordinates[2][0]}"][posY="${coordinates[2][1]}"]`),
    document.querySelector(`[posX="${coordinates[3][0]}"][posY="${coordinates[3][1]}"]`),
  ];
  
  for (let i = 0; i < snakeFigure.length; i++) {
    snakeFigure[i].classList.add("snake");
  }
}



function game(event) {
   let timer = setInterval(function () {
     let mark = true;
     let stop = false;
    let coordinatesSnake = [
      [snakeFigure[0].getAttribute("posX"), snakeFigure[0].getAttribute("posY")],
      [snakeFigure[1].getAttribute("posX"), snakeFigure[1].getAttribute("posY")],
      [snakeFigure[2].getAttribute("posX"), snakeFigure[2].getAttribute("posY")],
      [snakeFigure[3].getAttribute("posX"), snakeFigure[3].getAttribute("posY")],
    ];
  
    if (coordinatesSnake[0][1] == 18 || coordinatesSnake[0][0] == 23 || coordinatesSnake[0][1] == 1 || coordinatesSnake[0][0] == 1) {
      mark = false;
    }

    if (mark) {
      for (let i = 0; i < snakeFigure.length; i++) {
        snakeFigure[i].classList.remove("snake");
      }
      snakeFigure = [
        document.querySelector(`[posX="${coordinatesSnake[0][0]}"][posY="${+coordinatesSnake[0][1] + 1}"]`),
        document.querySelector(`[posX="${coordinatesSnake[1][0]}"][posY="${+coordinatesSnake[1][1] + 1}"]`),
        document.querySelector(`[posX="${coordinatesSnake[2][0]}"][posY="${+coordinatesSnake[2][1] + 1}"]`),
        document.querySelector(`[posX="${coordinatesSnake[3][0]}"][posY="${+coordinatesSnake[3][1] + 1}"]`),
      ];
      for (let i = 0; i < snakeFigure.length; i++) {
        snakeFigure[i].classList.add("snake");
      }
    } else {
      console.log("Game over");
      for (let i = 0; i < snakeFigure.length; i++) {
        if (snakeFigure[i].classList.contains("snake")) {
          snakeFigure[i].style.background = "#aa0808";
        }
      }
      clearTimeout(timer);
    }

  },300);
}




document.querySelector('.play').onclick = game;


creationSnake();