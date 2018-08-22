const SCALE = 50;
const BLOCK_WIDTH = 101;
const BLOCK_HEIGHT = 83;
const OFFSET_Y = -20;
const OFFSET_SPEED = 200;
let GAME_OVER = false;
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = getRandomInt(-500,-100);//delay bugs to show on canvas
    this.y = OFFSET_Y + getRandomInt(1,5) * BLOCK_HEIGHT;//4 stone blocks
    this.speed = OFFSET_SPEED + getRandomInt(1,4) * SCALE;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (!GAME_OVER){
        if (this.x < ctx.canvas.width){
            this.x += this.speed * dt;
            this.checkCollision(player);
        }else{
            this.x = getRandomInt(-500,-100);
            this.y = OFFSET_Y + getRandomInt(1,4) * BLOCK_HEIGHT;
            this.speed = OFFSET_SPEED + getRandomInt(1,4) * SCALE;
        }
    }


};
Enemy.prototype.checkCollision = function(player){
    if(this.y === player.y){
        if (Math.abs(this.x-player.x) <= 50){
            GAME_OVER = true;
        }
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // console.log(this.x,this.y)
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-princess-girl.png';

    //initial coordinate (2,4);
    this.x = 2 * BLOCK_WIDTH;
    this.y = OFFSET_Y + 5 * BLOCK_HEIGHT;
}
Player.prototype.update = function(x = 0, y = 0){
    if (x > 0){
        if (this.x < ctx.canvas.width- BLOCK_WIDTH){
            this.x += x;
        }
    }else{
        if (this.x >= BLOCK_WIDTH){
            this.x += x;
        }
    }

    if (y > 0){
        if (this.y < ctx.canvas.height- 3 * BLOCK_HEIGHT){
            this.y += y;
        }
    }else{
        if (this.y >= 0){
            this.y += y;
        }
    }



}
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(key){
    if (!GAME_OVER){
        if (key === 'up'){
            this.update(0,-BLOCK_HEIGHT);
        }else if (key === 'down'){
            this.update(0,BLOCK_HEIGHT);
        }else if (key === 'left'){
            this.update(-BLOCK_WIDTH,0);
        }else if (key === 'right'){
            this.update(BLOCK_WIDTH,0);
        }
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy()]
var player = new Player()

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
