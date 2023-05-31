var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var character = new Image();
var bg = new Image();
var ground = new Image();
var block_up = new Image();
var block_down = new Image();

character.src = "img/char.png";
bg.src = "img/bg.png";
ground.src = "img/ground.png";
block_up.src = "img/block_up.png";
block_down.src = "img/block_down.png";

var gap = 90;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
 yPos -= 25;
}

// Создание блоков
var block = [];

block[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
 ctx.drawImage(bg, 0, 0);

 for(var i = 0; i < block.length; i++) {
 ctx.drawImage(block_up, block[i].x, block[i].y);
 ctx.drawImage(block_down, block[i].x, block[i].y + block_up.height + gap);

 block[i].x--;

 if(block[i].x == 125) {
 block.push({
 x : cvs.width,
 y : Math.floor(Math.random() * block_up.height) - block_up.height
 });
 }

 // Отслеживание прикосновений
 if(xPos + character.width >= block[i].x
 && xPos <= block[i].x + block_up.width
 && (yPos <= block[i].y + block_up.height
 || yPos + character.height >= block[i].y + block_up.height + gap) || yPos + character.height >= cvs.height - ground.height) {
 location.reload(); // Перезагрузка страницы
 }

 if(block[i].x == 5) {
 score++;
 }
 }

 ctx.drawImage(ground, 0, cvs.height - ground.height);
 ctx.drawImage(character, xPos, yPos);

 yPos += grav;

 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Score: " + score, 10, cvs.height - 20);

 requestAnimationFrame(draw);
}

block_down.onload = draw;
