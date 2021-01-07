

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var ground;

var survivalTime = 0;

var score = 0;


gameState = "play";


function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(800,750);
  
  monkey = createSprite(150,725,20,50);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(400,745,1200,55);
  ground.x = ground.width /2;
  ground.shapeColor = "green";
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  survivalTime = 0;
  
}

function draw() {
  
  background("lightblue");
  
    ground.velocityX = -4;
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
    if(gameState === "play") {
    stroke("black");
    textSize(20);
    fill("black");
    text("Survival Time: "+ survivalTime, 75, 75);
    text("Bananas Caught: " + score, 500, 75);

    if (ground.x < 200) {
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 200) {
      monkey.velocityY = -12;
    }

  monkey.velocityY = monkey.velocityY + 0.8
  }

  if(bananaGroup.isTouching(monkey)) {
    bananaGroup.visible = false;
    bananaGroup.lifeTime = 0;
    score = score + 5;
  }

  if(gameState === "end") {
    stroke("black");
    textSize(20);
    fill("black");
    text("GAME OVER!");
    text("Press space to restart");  
    obstaclesGroup.visible = false;
    bananaGroup.visible = false;
    score = 0;
    survivalTime = 0;
    if(keyWentDown("space")) {
      gameState = "play";
    }
  }

  if(obstaclesGroup.isTouching(monkey)){
    gameState = "end";  
    
  }

  monkey.collide(ground);
  
  spawnObstacles();
  
  spawnBananas();
  
  drawSprites();

}


function spawnObstacles() {
  if (World.frameCount % 100 === 0){
    var obstacle = createSprite(800,675,10,40);
    obstacle.velocityX = -(4 + survivalTime/100);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.25;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
 }
}
function spawnBananas() {
  if(World.frameCount % 80 === 0) { 
    banana = createSprite(800,750,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.2;
    banana.velocityX = -4;
    
    banana.y = Math.round(random(200,500));
    
    banana.setLifetime = 50;
    
    bananaGroup.add(banana);
  }
}
