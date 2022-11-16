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
        this.image.src = 'images/enemy3.png';
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 3;
        this.height = this.spriteHeight / 3;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.speed = Math.random() * 4;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 5 + 1);//1 to 5
        this.gameFrame = 0;
        this.sineAngle = Math.random() * 500; //Determines start position of the object
        this.sineAngleSpeed = Math.random() * 0.5 + 0.5; // Controls speed of the pattern
    }
    update(){
        // Changing the Math.PI/90 to Math.PI/180, the pattern changes
        this.x = canvas.width/2 * Math.sin(this.sineAngle * Math.PI/90) + (canvas.width/2 - this.width/2);
        //Sine Angle
        this.y = canvas.height/2 * Math.cos(this.sineAngle * Math.PI/180) + (canvas.height/2 - this.height/2);
        this.sineAngle += this.sineAngleSpeed;
        //Loop the movement for continuous horizontal scroll
        if(this.x + this.width < 0){
            this.x = canvas.width;
        }

        //Animate sprite
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