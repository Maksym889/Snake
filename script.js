let field = document.querySelector(".snake-field");
let elem;
let mark = true;
let coordinatesSnake;
let left;
let right;
let up;
let down;
let coordinatesMouse;
let mouse;


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


// let snakeFigure;
// координаты начальной змейки

  let coordinates = [
    [12, 11],
    [12, 10],
    [12, 9],
    [12, 8]
  ];

  let snakeFigure = [
    document.querySelector(`[posX="${coordinates[0][0]}"][posY="${coordinates[0][1]}"]`),
    document.querySelector(`[posX="${coordinates[1][0]}"][posY="${coordinates[1][1]}"]`),
    document.querySelector(`[posX="${coordinates[2][0]}"][posY="${coordinates[2][1]}"]`),
    document.querySelector(`[posX="${coordinates[3][0]}"][posY="${coordinates[3][1]}"]`),
  ];
  
  for (let i = 0; i < snakeFigure.length; i++) {
    snakeFigure[i].classList.add("snake");
  }

function mouseCreate() {
  function randomMouse() {
    let arrX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    let arrY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    let x = arrX[Math.floor(Math.random() * arrX.length)];
    let y = arrY[Math.floor(Math.random() * arrY.length)];
    return [x, y]
  }

  let random = randomMouse();
  mouse = document.querySelector(`[posX="${random[0]}"][posY="${random[1]}"]`);

  while (mouse.classList.contains("snake")) {
    let random = randomMouse();
    mouse = document.querySelector(`[posX="${random[0]}"][posY="${random[1]}"]`);
  }
  mouse.classList.add("mouse");
  coordinatesMouse = [mouse.getAttribute("posX"), mouse.getAttribute("posY")];
}

function eat() {
  coordinatesSnake = [snakeFigure[0].getAttribute("posX"), snakeFigure[0].getAttribute("posY"),];
  if (coordinatesSnake[0] == coordinatesMouse[0] && coordinatesSnake[1] == coordinatesMouse[1]) {
    mouse.classList.remove("mouse");
    snakeFigure.push(document.querySelector(`[posX="${coordinatesMouse[0]}"][posY="${coordinatesMouse[1]}"]`))
    mouseCreate();
  }
}

// function snakeBite() {
//   coordinatesSnake = [snakeFigure[0].getAttribute("posX"), snakeFigure[0].getAttribute("posY"),];
  
// }
  

function goRight() {
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
      eat();
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

function goLeft() {
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
      eat();
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

function goDown() {
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
      eat();
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

function goUp() {
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
      eat();
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


document.addEventListener("keydown",  (event) => {
  switch (event.code) {
    case "ArrowRight": 
      if (left == true) {
        right = false;
      } else {
        right = true;
        goRight();
      }
      up = false;
      down = false;
      break;
    case "ArrowDown":
      if (up == true) {
        down = false;
      } else {
        down = true;
        goDown();
      }
      right = false;
      left = false;
      break;
    case "ArrowLeft":
      if (right == true) {
        left = false;
      } else {
        left = true;
        goLeft();
      }
      up = false;
      down = false;
      break;
    case "ArrowUp":
      if (down == true) {
        up = false;
      } else {
        up = true;
        goUp();
      }
      right = false;
      left = false;
      break;
  }
  return false;
});



mouseCreate();
