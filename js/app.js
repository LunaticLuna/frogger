// Enemies our player must avoid
const scale = 50;
const xblock = 101;
const yblock = 83;
const yOffSet = -20;
const speedOffSet = 200;
let GAME_OVER = false;
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = getRandomInt(-500,-100);//delay bugs to show on canvas
    this.y = yOffSet + getRandomInt(1,4) * yblock;
    this.speed = speedOffSet + getRandomInt(1,4) * scale;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (!GAME_OVER){
        console.log(GAME_OVER)
        if (this.x < ctx.canvas.width){
            this.x += this.speed * dt;
            this.checkCollision(player);
        }else{
            this.x = getRandomInt(-500,-100);
            this.y = yOffSet + getRandomInt(1,4) * yblock;
            this.speed = speedOffSet + getRandomInt(1,4) * scale;
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
    this.x = 2 * xblock;
    this.y = yOffSet + 4 * yblock;
}
Player.prototype.update = function(x = 0, y = 0){
    this.x += x;
    this.y += y;

}
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(key){
    if (!GAME_OVER){
        if (key === 'up'){
            this.update(0,-yblock);
        }else if (key === 'down'){
            this.update(0,yblock);
        }else if (key === 'left'){
            this.update(-xblock,0);
        }else if (key === 'right'){
            this.update(xblock,0);
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
