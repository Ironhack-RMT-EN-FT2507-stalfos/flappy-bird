class Bird {

  constructor() {
    // here are all of the properties of any bird we create

    this.node = document.createElement("img")
    this.node.className = "bird" // optional
    this.node.src = "./images/flappy.png"

    gameBoxNode.append(this.node)

    this.x = 70
    this.y = 50
    this.h = 35
    this.w = 40

    // adjusting the initial dimensions
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`

    // adjust the initial position
    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`

    this.gravitySpeed = 2
    this.jumpSpeed = 35

  }

  // here are all of the methods of any bird we create
  gravityEffect() {

    //todo comment this once you add the gameOver
    if ((this.y + this.h) > gameBoxNode.offsetHeight) {
      return // break the function, don't add more gravity
    }

    this.y += this.gravitySpeed
    this.node.style.top = `${this.y}px`
  }

  jump() {
    
    if (this.y < 0) {
      // if the bird is above the top of the screen
      return; // break the function, don't jump
    }

    this.y -= this.jumpSpeed
    this.node.style.top = `${this.y}px`
  }

}