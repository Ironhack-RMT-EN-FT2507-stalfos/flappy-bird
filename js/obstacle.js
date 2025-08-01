class Obstacle {

  constructor( type, yPos ) {

    this.node = document.createElement("img")
    this.node.className = "obstacle" // optional

    if (type === "top") {
      this.node.src = "./images/obstacle_top.png"
    } else if(type === "bottom") {
      this.node.src = "./images/obstacle_bottom.png"
    }

    gameBoxNode.append(this.node)

    this.x = gameBoxNode.offsetWidth
    this.y = yPos
    this.h = 240
    this.w = 50

    // adjusting the initial dimensions
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`
    
    // adjust the initial position
    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`

    this.speed = 2
    this.type = type // this will allow us to know the type of element even inside our methods

  }

  automaticMovement() {
    this.x -= this.speed
    this.node.style.left = `${this.x}px`
  }

}