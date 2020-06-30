const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

// load images

const whale = new Image();
const bg = new Image();
const fg = new Image();
const stalactiteNorth = new Image();
const stalactiteSouth = new Image();

whale.src = "images/whale.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
stalactiteNorth.src = "images/stalactiteNorth.png";
stalactiteSouth.src = "images/stalactiteSouth.png";


// some variables

let gap = 175;
let constant;

let bX = 40;
let bY = 200;

let gravity = 0.75;

let score = 0;

// audio files

let swim = new Audio();
let scor = new Audio();

swim.src = "sounds/swim.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 45;
    swim.play();
}

// stalactite coordinates

let stalactite = [];

stalactite[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(let i = 0; i < stalactite.length; i++){
        
        constant = stalactiteNorth.height+gap;
        ctx.drawImage(stalactiteNorth,stalactite[i].x,stalactite[i].y);
        ctx.drawImage(stalactiteSouth,stalactite[i].x,stalactite[i].y+constant);
             
        stalactite[i].x--;
        
        if( stalactite[i].x == 200 ){
            stalactite.push({
                x : cvs.width,
                y : Math.floor(Math.random()*stalactiteNorth.height)-stalactiteNorth.height
            }); 
        }

        // detect collision
        
        if( bX + whale.width >= stalactite[i].x && bX <= stalactite[i].x + stalactiteNorth.width && (bY <= stalactite[i].y + stalactiteNorth.height || bY+whale.height >= stalactite[i].y+constant) || bY + whale.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }
        
        if(stalactite[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(whale,bX,bY);
    
    bY += gravity;
    
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();
























