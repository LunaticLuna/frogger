const SCALE = 50;
const BLOCK_WIDTH = 101;
const BLOCK_HEIGHT = 83;
const OFFSET_Y = -20;
const OFFSET_SPEED = 200;
const ROWS = 6;
const COLS = 5;
const NUM_ENEMIES = 6;
let GAME_OVER = true;


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

/*********************************************************************
************                     Enemy                    ************
************                     Class                    ************
**********************************************************************/
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = getRandomInt(-7,-1) * BLOCK_WIDTH;//delay bugs to show on canvas
    this.y = OFFSET_Y + getRandomInt(1,5) * BLOCK_HEIGHT;//4 stone blocks
    this.speed = OFFSET_SPEED + getRandomInt(0,5) * SCALE;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (!GAME_OVER){
        if (this.x < ctx.canvas.width){
            this.x += this.speed * dt;
            this.checkCollision(player);
        }else{
            this.reset();
        }
    }
};
Enemy.prototype.checkCollision = function(player){
    let playerY = player.coordY * BLOCK_HEIGHT + OFFSET_Y;
    let playerX = player.coordX * BLOCK_WIDTH;
    if(this.y === playerY){
        if (Math.abs(this.x-playerX) <= 50){
            GAME_OVER = true;
            lose();
        }
    }
}
Enemy.prototype.reset = function(){
    this.x = getRandomInt(-7,-1) * BLOCK_WIDTH;//delay bugs to show on canvas
    this.y = OFFSET_Y + getRandomInt(1,5) * BLOCK_HEIGHT;//4 stone blocks
    this.speed = OFFSET_SPEED + getRandomInt(1,4) * SCALE;
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*********************************************************************
************                     Player                   ************
************                     Class                    ************
**********************************************************************/
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-princess-girl.png';
    //initial coordinate (2,5);
    this.coordX = 2;
    this.coordY = 5;
}
Player.prototype.update = function(x = 0, y = 0){
    if (x > 0){
        if (this.coordX < COLS- 1){
            this.coordX += x;
        }
    }else{
        if (this.coordX >= 1){
            this.coordX += x;
        }
    }
    if (y > 0){
        if (this.coordY < ROWS - 1){
            this.coordY += y;
        }
    }else{
        if (this.coordY >= 1){
            this.coordY += y;
        }
    }
    if (this.coordY === 0){
        win();
        GAME_OVER = true
    }
}
Player.prototype.render = function(){
    //change coordinates to pixels;
    x = this.coordX * BLOCK_WIDTH;
    y = this.coordY * BLOCK_HEIGHT + OFFSET_Y;

    ctx.drawImage(Resources.get(this.sprite), x, y);
}
Player.prototype.handleInput = function(key){
    if (!GAME_OVER){
        console.log(GAME_OVER);
        if (key === 'up'){
            this.update(0,-1);
        }else if (key === 'down'){
            this.update(0,1);
        }else if (key === 'left'){
            this.update(-1,0);
        }else if (key === 'right'){
            this.update(1,0);
        }
    }else{
        console.log(GAME_OVER);
        if (key === "s"){
            this.restart();
        }
        if (key === 'space'){
            start();
        }
    }
}
Player.prototype.restart = function(){
    allEnemies.forEach(function(){this.reset});
    this.coordX = 2;
    this.coordY = 5;
    const d = document.getElementsByClassName('modal')[0];
    d.className = "modal hide";
    GAME_OVER = false;
}

// All enemy objects in an array called allEnemies
// Player object in a variable called player

var allEnemies = [];
function start(){
    for (let i = 0; i < NUM_ENEMIES; i++) {
        allEnemies[i] = new Enemy();
    };
    this.coordX = 2;
    this.coordY = 5;
    const d = document.getElementsByClassName('modal')[0];
    d.className = "modal hide";
    GAME_OVER = false;

}
function lose(){
    const d = document.getElementsByClassName('modal')[0];
    d.innerHTML = `You lost T_T<br>
                    Press s to restart`
    d.className = "modal show";
}
function win(){
    const d = document.getElementsByClassName('modal')[0];
    d.innerHTML = `You win!(⁎˃ᴗ˂⁎)<br>
                    Press s to restart`
    d.className = "modal show";
}

var player = new Player()

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        83: 's',
        32: 'space',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
