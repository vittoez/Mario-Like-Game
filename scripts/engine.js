
class GameEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.canvas.width = 800;
        this.canvas.height = 400;
        this.keys = {};
        this.lastTime = 0;
        this.deltaTime = 0;
        this.entities = [];
        this.gravity = 0.5;
        this.difficulty = 1;

        window.addEventListener("keydown", (e) => (this.keys[e.key] = true));
        window.addEventListener("keyup", (e) => (this.keys[e.key] = false));
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    update(deltaTime) {
        this.entities.forEach((entity) => entity.update(this, deltaTime));
        this.difficulty += 0.001; // Gradually increase difficulty
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.entities.forEach((entity) => entity.draw(this.context));
    }

    gameLoop = (timestamp) => {
        this.deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(this.deltaTime);
        this.draw();

        requestAnimationFrame(this.gameLoop);
    };

    start() {
        requestAnimationFrame(this.gameLoop);
    }
}
