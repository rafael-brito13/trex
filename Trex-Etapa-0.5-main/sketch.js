var solo_invisivel
var trex, trex_running, edges;
var groundImage;
var solo;
var score = 0; 
var play = 1
var end = 0
var gameState = play
var grupoObstaculos
var grupoNuvens

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  nuvemImagem = loadImage("cloud.png")
  obs1 = loadImage ("obstacle1.png")
  obs2 = loadImage ("obstacle2.png")
  obs3 = loadImage ("obstacle3.png")
  obs4 = loadImage ("obstacle4.png")
  obs5 = loadImage ("obstacle5.png")
  obs6 = loadImage ("obstacle6.png")
  trexCollide = loadAnimation ("trex_collided.png")
  gameover = loadImage ("gameOver.png")
  restart = loadImage ("restart.png")
  salto = loadSound ("jump.mp3")
  die = loadSound ("die.mp3")
  checkPoint = loadSound ("checkpoint.mp3")
}

function setup(){
  createCanvas(600, 200);


  //criando o trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation ("collided", trexCollide)
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

  solo = createSprite(200, 180, 400, 20)
  //solo.x = solo.width/2
  solo.addImage (groundImage)


  solo_invisivel = createSprite(200, 190, 400, 10)
  solo_invisivel.visible = false

  grupoObstaculos = createGroup ()
  grupoNuvens = createGroup ()

  trex.debug = true
  trex.setCollider ('circle', 0, 0, 40)


 fimdejogo = createSprite (300, 100, 20, 50)
 fimdejogo.addImage (gameover)
 fimdejogo.scale = 0.5
 reiniciar = createSprite (300, 140, 30, 30)
 reiniciar.addImage (restart)
 reiniciar.scale = 0.5
}


function draw(){
  //definir a cor do plano de fundo 
  background("black");
  
if (score > 0 && score %100 == 0){
checkPoint.play ()
}

text ("Pontuacao: " + score, 50, 30)


if (gameState == play){

fimdejogo.visible = false
reiniciar.visible = false

  score = score + Math.round (frameRate()/30)

solo.velocityX = -(3 + (3 * score)/100)

 if(keyDown("space")&& trex.y >= height - 120 || touches.lenght > 0){
 trex.velocityY = -10;
 salto.play ()
 touches = []
  }
  trex.velocityY = trex.velocityY + 0.5;
if (trex.isTouching (grupoObstaculos)){

gameState = end

die.play ()
}

gerarnuvens ()
  gerarobs ()

} else if (gameState == end){

fimdejogo.visible = true
reiniciar.visible = true

trex.changeAnimation ("collided", trexCollide)
trex.velocityY = 0
solo.velocityX = 0

grupoObstaculos.setVelocityXEach (0)-
grupoNuvens.setVelocityEach (0)

grupoObstaculos.setLifetimeEach (-1)
grupoNuvens.setLifetimeEach (-1)


}

 //impedir que o trex caia
  trex.collide(solo_invisivel)
  drawSprites();

  if ( solo.x <0){ solo.x= solo.width/2}

  if (mousePressedOver(reiniciar)){
 reset()
}
}
function reset (){

  gameState = play
  score = 0
  grupoObstaculos.destroyEach ()
  grupoNuvens.destroyEach ()
  trex.changeAnimation ("running", trex_running)
} 
function gerarnuvens () {
if (frameCount %60 == 0){

nuvem = createSprite (600, 100, 40, 10)
nuvem.velocityX = -(4 + (3 * score)/100)
nuvem.scale = 0.7
nuvem.addImage(nuvemImagem)
nuvem.y = Math.round (random(60, 100))

nuvem.lifetime = 220

console.log (trex.depth)
console.log (nuvem.depth)
nuvem.depth = trex.depth
trex.depth = trex.depth + 1

grupoNuvens.add (nuvem)
}
}
function gerarobs () {

if (frameCount %60 == 0){
cacto = createSprite (600, 158, 10, 40)
cacto.velocityX = -(6 + score/100)
cacto.scale = 0.5

cacto.lifetime = 120

var rand = Math.round (random(1, 6))
switch (rand){

case 1: cacto.addImage (obs1)
break;
case 2: cacto.addImage(obs2)
break;
case 3: cacto.addImage(obs3)
break;
case 4: cacto.addImage(obs4)
break;
case 5: cacto.addImage(obs5)
break;
case 6: cacto.addImage(obs6)
break;

default: break;
}
grupoObstaculos.add (cacto)
}
}