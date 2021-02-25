var tower,towerImg;
var door,doorImg,doorsGroup;
var ghost,ghostImg;
var climber,climberImg,climbersGroup;
var edges;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
   spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImg);
  edges = createEdgeSprites();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);
 
  if ( gameState === "play"){
  if (tower.y>400){
    tower.y = 300
  }
  
  if(keyDown("space")){
    ghost.velocityY =-4;
  }
  
  if(keyDown("right_arrow")){
    ghost.velocityX = 2;
  }
  
   if(keyDown("left_arrow")){
    ghost.velocityX = -2;
  }
  
  ghost.velocityY = ghost.velocityY + 0.2;
  
 // ghost.collide(rightEdge);
  
 // ghost.collide(leftEdge);
  
  spawnDoors();
  
  }
  
   if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
     ghost.velocityX = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
  
  drawSprites();
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}

function spawnDoors(){
 if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
     doorsGroup.add(door);
   
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
   
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
