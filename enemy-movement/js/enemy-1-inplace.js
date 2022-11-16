/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 400;
const CANVAS_HEIGHT = canvas.height = 600;

const numberOfEnemies = 10;
let grameFrame = 0;

class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = 'images/enemy1.png';
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 3;
        this.height = this.spriteHeight / 3;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        //this.speed = Math.random() * 4 - 2;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 5 + 1);//1 to 5
        this.gameFrame = 0;
    }
    update(){
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
        if(grameFrame % this.flapSpeed === 0){
            this.frame < 5 ? this.frame++ : this.frame = 0; 
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

const enemyArray = [];
for(let i=0; i < numberOfEnemies; i++){
    enemyArray.push(new Enemy());
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemyArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    grameFrame++;
    requestAnimationFrame(animate);
}
animate();