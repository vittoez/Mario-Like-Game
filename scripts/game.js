
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.velocityX = 0;
        this.velocityY = 0;
        this.color = "red";
        this.isJumping = false;
        this.score = 0;
    }

    update(engine, deltaTime) {
        if (engine.keys["ArrowRight"]) this.velocityX = 5;
        else if (engine.keys["ArrowLeft"]) this.velocityX = -5;
        else this.velocityX = 0;

        if (engine.keys["ArrowUp"] && !this.isJumping) {
            this.velocityY = -12;
            this.isJumping = true;
        }

        this.velocityY += engine.gravity;
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Prevent going out of bounds
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > engine.canvas.width)
            this.x = engine.canvas.width - this.width;

        // Simulate ground collision
        if (this.y + this.height > engine.canvas.height) {
            this.y = engine.canvas.height - this.height;
            this.velocityY = 0;
            this.isJumping = false;
        }
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.color = "blue";
        this.speed = speed;
    }

    update(engine, deltaTime) {
        this.x -= this.speed * engine.difficulty;
        if (this.x + this.width < 0) this.x = engine.canvas.width + Math.random() * 200;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Initialize the game
const engine = new GameEngine("gameCanvas");
const player = new Player(100, 300);
const enemy1 = new Enemy(800, 360, 2);
const enemy2 = new Enemy(1000, 360, 3);

engine.addEntity(player);
engine.addEntity(enemy1);
engine.addEntity(enemy2);
engine.start();
