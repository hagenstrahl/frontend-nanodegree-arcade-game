// movement
const movementX = 101;
const movementY = 85;

// Enemies our player must avoid
function Enemy() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random() * movementX * 2;
    this.y = (Math.floor(Math.random() * 3) + 1) * movementY - 50;
    this.speed = Math.floor(Math.random() * 500 + 150);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= movementX * 5) {
        this.x += dt * this.speed;
    } else {
        this.x = -movementX;
        this.y = (Math.floor(Math.random() * 3) + 1) * movementY - 50;
    }
    //this.render();
    //setTimeout(this.update, (2000 * dt));
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = movementX * 2;
        this.y = movementY * 5 - 50;
        this.nextMove = '';
    }

    /*
    This functions converts the players input into the new positions
     */
    update() {
        switch (this.nextMove) {
            case 'left':
                if (this.x > 0) {
                    this.x-=movementX;
                }
                break;
            case 'right':
                if (this.x < movementX * 4) {
                    this.x+=movementX;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= movementY;
                }
                break;
            case 'down':
                if (this.y < movementY * 5 - 50) {
                    this.y += movementY;
                }
                break;
        }
        this.nextMove = '';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(arrowKey) {
        this.nextMove = arrowKey;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
function generateEnemies(count) {
    let enemies = [];
    for (let i = 0; i < count; i++) {
        enemies.push(new Enemy());
    }
    return enemies;
};

let allEnemies = generateEnemies(4);

// Place the player object in a variable called player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
