const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'images/shadow_dog.png';

let spriteWidth = 575;//=6876/12 cols approx
let spriteHeight = 523;//=5230/10 rows approx


const spriteImageActions = [
    {
        name: 'Idle',
        row: 0,
        columns: 6

    },
    {
        name: 'Jump',
        row: 1,
        columns: 6

    },
    {
        name: 'Fall',
        row: 2,
        columns: 6

    },
    {
        name: 'Run',
        row: 3,
        columns: 8
    },
    {
        name: 'Dizzy',
        row: 4,
        columns: 10
    },
    {
        name: 'Sit',
        row: 5,
        columns: 4
    },
    {
        name: 'Roll',
        row: 6,
        columns: 6
    },
    {
        name: 'Attack',
        row: 7,
        columns: 6
    },
    {
        name: 'KO',
        row: 8,
        columns: 11
    },
    {
        name: 'Howl',
        row: 9,
        columns: 3
    }
];

let animateAction = 'Idle';
let noOfColumns = spriteImageActions.find(action => action.name === animateAction).columns;

let xPosition = 0;
let yPosition = spriteImageActions.find(action => action.name === animateAction).row;
const frameDelay = 5;
let frameCount = 0;

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.fillRect(100, 50, 100, 100);
    //ctx.drawImage(playerImage, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(playerImage, xPosition * spriteWidth, yPosition * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    if(frameCount < frameDelay){
        frameCount++;
    }else{
        frameCount = 0;
        if(xPosition < noOfColumns){
            xPosition++;
        }else{
            xPosition = 0;
        }
    }

    requestAnimationFrame(animate);
}

function fillActionsDropdown(){
    let actionDropDown = document.getElementById('action');
    spriteImageActions.forEach((action)=>{
        var opt = document.createElement('option');
        opt.value = action.name;
        opt.innerHTML = action.name;
        actionDropDown.appendChild(opt);
    });
}


document.getElementById('action').onchange = function() {
    animateAction = document.getElementById('action').value;
    noOfColumns = spriteImageActions.find(action => action.name === animateAction).columns;
    yPosition = spriteImageActions.find(action => action.name === animateAction).row;
};

fillActionsDropdown();
animate();