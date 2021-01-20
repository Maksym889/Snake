let field = document.querySelector(".snake-field");

for (let i = 1; i < 501; i++) {
  elem = document.createElement("div");
  elem.classList.add("markup");
  field.appendChild(elem);
}

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


let mark = true;
let coordinatesSnake = 0;
let left;
let right;
let up;
let down;

function snakeRight() {
  let timerId = setInterval(() => {
    coordinatesSnake = [
      snakeFigure[0].getAttribute("posX"), snakeFigure[0].getAttribute("posY"),
    ];

    if (coordinatesSnake[0] == 23) {
      mark = false;
      clearTimeout(timerId);
    }
    else if (mark) {
      snakeFigure[snakeFigure.length - 1].classList.remove("snake");
      snakeFigure.pop();
      snakeFigure[0].classList.remove("snake");
      snakeFigure.unshift(document.querySelector(`[posX="${+coordinatesSnake[0] + 1}"][posY="${+coordinatesSnake[1]}"]`))
    
      for (let i = 0; i < snakeFigure.length; i++) {
        snakeFigure[i].classList.add("snake");
      }
      if (right == false) {
        clearTimeout(timerId);
        mark = true;
      }
    }
    
  }, 300);
}

function snakeLeft() {
  let timerId = setInterval(() => {
    coordinatesSnake = [
      snakeFigure[0].getAttribute("posX"), snakeFigure[0].getAttribute("posY")
    ];
  
    if (coordinatesSnake[0] == 1) {
      clearTimeout(timerId);
      mark = false;
    }
    else if (mark) {
      snakeFigure[snakeFigure.length - 1].classList.remove("snake");
      snakeFigure.pop();
      snakeFigure[0].classList.remove("snake");
      snakeFigure.unshift(document.querySelector(`[posX="${+coordinatesSnake[0] - 1}"][posY="${+coordinatesSnake[1]}"]`))
    
      for (let i = 0; i < snakeFigure.length; i++) {
        snakeFigure[i].classList.add("snake");
      }
      if (left == false) {
        clearTimeout(timerId);
        mark = true;
      }
    }
  }, 300);
}

function snakeDown() {
  let timerId = setInterval(() => {
    coordinatesSnake = [
      snakeFigure[0].getAttribute("posX"), snakeFigure[0].getAttribute("posY"),
    ];
  
    if (coordinatesSnake[1] == 1) {
      clearTimeout(timerId);
      mark = false;
    } else if (mark) {
      snakeFigure[snakeFigure.length - 1].classList.remove("snake");
      snakeFigure.pop();
      snakeFigure[0].classList.remove("snake");
      snakeFigure.unshift(document.querySelector(`[posX="${+coordinatesSnake[0]}"][posY="${+coordinatesSnake[1] - 1}"]`))
    
      for (let i = 0; i < snakeFigure.length; i++) {
        snakeFigure[i].classList.add("snake");
      }
      if (down == false) {
        clearTimeout(timerId);
        mark = true;
      }
    }
  }, 300);
}

function snakeUp() {
  let timerId = setInterval(() => {
    coordinatesSnake = [
      snakeFigure[0].getAttribute("posX"), snakeFigure[0].getAttribute("posY")
    ];

    if (coordinatesSnake[1] == 18) {
      mark = false;
    } else if (mark) {
      snakeFigure[snakeFigure.length - 1].classList.remove("snake");
      snakeFigure.pop();
      snakeFigure[0].classList.remove("snake");
      snakeFigure.unshift(document.querySelector(`[posX="${+coordinatesSnake[0]}"][posY="${+coordinatesSnake[1] + 1}"]`));
    
      for (let i = 0; i < snakeFigure.length; i++) {
        snakeFigure[i].classList.add("snake");
      }
      if (up == false) {
        clearTimeout(timerId);
        mark = true;
      }
    }
  }, 300);
}

function randomMouse() {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  let x = getRandomInt(1, 23);
  let y = getRandomInt(1, 18);
  document.querySelector(`[posX="${x}"][posY="${y}"]`).classList.add("mouse");
  for (let i = 0; i < snakeFigure.length; i++) {
    if (document.querySelector(`[posX="${x}"][posY="${y}"]`) != snakeFigure[i]) {
      document.querySelector(`[posX="${x}"][posY="${y}"]`).classList.add("mouse");
    }
  }
}

document.addEventListener("keydown",  (event) => {
  console.log(event)
  switch (event.code) {
    case "ArrowRight":
      right = true;
      left = false;
      up = false;
      down = false;
      snakeRight();
      break;
    case "ArrowDown":
      right = false;
      left = false;
      up = false;
      down = true;
      snakeDown();
      break;
    case "ArrowLeft":
      right = false;
      left = true;
      up = false;
      down = false;
      snakeLeft();
      break;
    case "ArrowUp":
      right = false;
      left = false;
      up = true;
      down = false;
      snakeUp();
      break;
  }
  return false;
});


// function game(event) {
//    let timer = setInterval(function () {
//      let mark = true;
//      let stop = false;
//     let coordinatesSnake = [
//       [snakeFigure[0].getAttribute("posX"), snakeFigure[0].getAttribute("posY")],
//       [snakeFigure[1].getAttribute("posX"), snakeFigure[1].getAttribute("posY")],
//       [snakeFigure[2].getAttribute("posX"), snakeFigure[2].getAttribute("posY")],
//       [snakeFigure[3].getAttribute("posX"), snakeFigure[3].getAttribute("posY")],
//     ];
  
//     if (coordinatesSnake[0][1] == 18 || coordinatesSnake[0][0] == 23 || coordinatesSnake[0][1] == 1 || coordinatesSnake[0][0] == 1) {
//       mark = false;
//     }

//     if (mark) {
//       for (let i = 0; i < snakeFigure.length; i++) {
//         snakeFigure[i].classList.remove("snake");
//       }
//       snakeFigure = [
//         document.querySelector(`[posX="${coordinatesSnake[0][0]}"][posY="${+coordinatesSnake[0][1] + 1}"]`),
//         document.querySelector(`[posX="${coordinatesSnake[1][0]}"][posY="${+coordinatesSnake[1][1] + 1}"]`),
//         document.querySelector(`[posX="${coordinatesSnake[2][0]}"][posY="${+coordinatesSnake[2][1] + 1}"]`),
//         document.querySelector(`[posX="${coordinatesSnake[3][0]}"][posY="${+coordinatesSnake[3][1] + 1}"]`),
//       ];
//       for (let i = 0; i < snakeFigure.length; i++) {
//         snakeFigure[i].classList.add("snake");
//       }
//     } else {
//       console.log("Game over");
//       for (let i = 0; i < snakeFigure.length; i++) {
//         if (snakeFigure[i].classList.contains("snake")) {
//           snakeFigure[i].style.background = "#aa0808";
//         }
//       }
//       clearTimeout(timer);
//     }

//   },300);
// }

// document.querySelector('.play').onclick = game;

randomMouse();
creationSnake();