//* GLOBAL DOM ELEMENTS

// screens
const startScreenNode = document.querySelector("#start-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// buttons
const startBtnNode = document.querySelector("#start-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")

// other nodes
const scoreNode = document.querySelector("#score-value")


//* GLOBAL GAME VARIABLES

let birdObj = null; // this will be empty is because at this point the game has not started
//! test
let obstacleArr = [];

// let frames = 0;
let minimunTopObstaclePos = -120
let obstacleSeparation = 350
let obstacleSpawnFrequency = 2000

let gameIntervalId = null;
let obstacleSpawnIntervalId = null;

let score = 0;

//* GLOBAL GAME FUNCTIONS

function startGame() {

  //1. hide the start game screen
  startScreenNode.style.display = "none"

  //2. show the game screen
  gameScreenNode.style.display = "flex"

  //3. add any initial element to the game
  birdObj = new Bird()
  // console.log(birdObj)


  //4. start the game loop (interval)
  gameIntervalId = setInterval(gameLoop, Math.round(1000/60)) // running the interval 60fps

  //5. we start any other interval or timeout that we may need
  obstacleSpawnIntervalId = setInterval(spawnObstacle, obstacleSpawnFrequency)

}

function spawnObstacle() {

  let randomPosYTop = Math.floor(  Math.random() * minimunTopObstaclePos ) // between -100 and 0

  let obstacleTop = new Obstacle( "top", randomPosYTop )
  obstacleArr.push( obstacleTop )

  let obstacleBottom = new Obstacle( "bottom", randomPosYTop + obstacleSeparation )
  obstacleArr.push(obstacleBottom)

  // console.log(obstacleArr)
}

function checkDespawnObstacle() {
  if (obstacleArr[0] && obstacleArr[0].x < (0 - obstacleArr[0].w)) {
    // destroy the first obstacle
    //* To remove elements from the game we need to consider BOTH environments
    //* We remove it from the DOM
    obstacleArr[0].node.remove()

    //* We remove it from the code
    obstacleArr.splice(0, 1) // or shift if it is always the first one

    //BONUS
    score += 0.5 // this is because it is removing 2 obstacles at a time
    scoreNode.innerText = Math.floor(score)
  }
}

function gameLoop() {
  // frames++
  // console.log("interval running!")

  birdObj.gravityEffect()

  obstacleArr.forEach((eachObstacleObj) => {
    eachObstacleObj.automaticMovement()
  })

  checkDespawnObstacle()
  checkCollisionBirdFloor()
  checkCollisionBirdObstacles()

  // if (frames % 60 === 0) {
  //   // when 1 second has passed (when 60 frames have passed)
  //   spawnObstacle()
  // }

}

function handleBirdJump(event) {
  if (event.code === "Space" || event.code === "ArrowUp") {
    birdObj.jump()
  }
}

function checkCollisionBirdFloor() {
  if ((birdObj.y + birdObj.h) > gameBoxNode.offsetHeight) {
    // console.log("bird crashed through the floor")
    gameOver()
  }
}

function gameOver() {

  //*1. we need to clear ALL intervals and timeouts
  clearInterval(gameIntervalId)
  clearInterval(obstacleSpawnIntervalId)

  //*2. hide the game screen
  gameScreenNode.style.display = "none"

  //*3. make the game over screen appear
  gameOverScreenNode.style.display = "flex"

  //*4 we need to CLEAR the game (removing all nodes and restarting all variables)

}

function checkCollisionBirdObstacles() {

  // birdObj
  // obstacleArr

  obstacleArr.forEach(( eachObstacleObj ) => {

    // if (eachObstacleObj.x > 150) {
    //   return // don't check for collisions if the obstacle has not arrive to the bird location
    // }

    let isColliding = checkCollision(birdObj, eachObstacleObj)
    if (isColliding) {
      gameOver()
    }

  })

}

function checkCollision(element1, element2) {
  if (    
    element1.x < element2.x + element2.w &&
    element1.x + element1.w > element2.x &&
    element1.y < element2.y + element2.h &&
    element1.y + element1.h > element2.y
  ) {
    return true
  } else {
    return false
  }
}

//* EVENT LISTENERS

startBtnNode.addEventListener("click", startGame)
document.addEventListener("keydown", handleBirdJump)





//* Planning of the game (what will be the elements, properties and actions)



/*

- Background ✅
- Bird
  - x, y, h, w, speedGravity, speedJump ✅
  - jump (but cannot move past the ceiling) ✅
  - gravity ✅
- Obstacles
  - x, y, h, w, speed ✅
  - automatic movement ✅

- spawn ostacles ✅
- check for despawn the obstacles ✅
- collision bird - obstacle ✅
- collision bird - floor ✅
- gameOver ✅

BONUS
 - score

*/
