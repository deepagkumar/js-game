const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

const backgroundImageLayer1 = new Image();
backgroundImageLayer1.src = 'images/layer-1.png'
const backgroundImageLayer2 = new Image();
backgroundImageLayer2.src = 'images/layer-2.png'
const backgroundImageLayer3 = new Image();
backgroundImageLayer3.src = 'images/layer-3.png'
const backgroundImageLayer4 = new Image();
backgroundImageLayer4.src = 'images/layer-4.png'
const backgroundImageLayer5 = new Image();
backgroundImageLayer5.src = 'images/layer-5.png'

let gameSpeed = document.getElementById("gameSpeed").value;
document.getElementById("gameSpeedSlider").addEventListener('change', (e)=>{
    document.getElementById("gameSpeed").value = e.target.value;
    gameSpeed = e.target.value;
});

class Layer {
    constructor(image, speedModifier){
        this.width = 2400;
        this.height = 720;
        this.x = 0;
        this.y = 0;
        this.image = image;
        this.speedModifier = speedModifier;
    }

    update(){
        this.x = this.x - gameSpeed * this.speedModifier;
        if(this.x < -this.width){
            this.x = 0;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.x, 0);
        ctx.drawImage(this.image, this.x + this.width, 0);
    }
}

const layer1 = new Layer(backgroundImageLayer1, 0.2);
const layer2 = new Layer(backgroundImageLayer2, 0.4);
const layer3 = new Layer(backgroundImageLayer3, 0.6);
const layer4 = new Layer(backgroundImageLayer4, 0.8);
const layer5 = new Layer(backgroundImageLayer5, 1);

const layerArray = [layer1, layer2, layer3, layer4, layer5];

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layerArray.forEach(layer => {
        layer.update();
        layer.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();