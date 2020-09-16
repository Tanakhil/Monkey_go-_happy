//Global Variables
var banana,bananaimage,foodgroup;
var monkey,monkeyimage;
var obstacleimage,obstaclegroup;
var back,score,bg,ground,groundimage;
var gamestate,play,end;
var gameover, gameoverImage;
var survivalTime=0;
var score =0;
var survivalTime=0;
var score =0;


function preload(){
  
  bananaimage=loadImage("banana.png")

monkeyimage=loadAnimation("Monkey_01.png", "Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")

  obstacleimage=loadImage("stone.png")

  back=loadImage("jungle.jpg")

  gameoverImage=loadImage("gameover.jpg")
}


function setup() {
  createCanvas(600,300);

  play=1;
  end=0;
  gamestate=play;
  foodgroup= new Group();
  obstaclegroup= new Group();
  bg= createSprite(100,20,600,600);
  bg.addImage("background",back);
  monkey=createSprite(50,245,10,10);
  monkey.addAnimation("monkey",monkeyimage)
  monkey.scale = 0.1;
  ground=createSprite(300,290,600,10);
  ground.visible = false; 
  
  gameover=createSprite(300,150,10,10);
  gameover.addAnimation("gameover",gameoverImage)
  gameover.scale = 0.4;
  gameover.visible = false; 
}


function draw(){
 background(255); 
  monkey.collide(ground);
  text("score:"+score,300,100)
  if(gamestate===play){
    createBanana();
    createObstacle();
    if(keyDown("space") && monkey.y > 250)
    {
       monkey.velocityY=-10;
    }
    monkey.velocityY= monkey.velocityY+0.5 
    if(foodgroup.isTouching(monkey)){
       foodgroup.destroyEach();
      score=score+1;
    }
    if(obstaclegroup.isTouching(monkey)){
       gamestate=end 
    }
  }
  else if(gamestate===end)
  {
    gameover.visible = true;
    foodgroup.setVelocityXEach(0)
    obstaclegroup.setVelocityXEach(0)
    obstaclegroup.setLifetimeEach(-1)
    foodgroup.setLifetimeEach(-1)
    score = 0;
    survivalTime = 0;
  }
  
  
  drawSprites();
  
  
  score.depth = score.depth  + 1;
  survivalTime.depth = survivalTime.depth  + 1;
  bg.depth = bg.depth - 1;
  
  survivalTime=Math.ceil(frameCount/60) ;
  fill("white");
  textSize(18)
  text("Survival Time: "+ survivalTime, 220, 30);
  
  fill("white");
  stroke("black");
  textSize(20);
  text("Score: "+ score, 500,50);
  
}

function createBanana(){
  if(World.frameCount%80===0){
    banana=createSprite(390,270);
    banana.y=random(100,200);
    banana.scale=0.05;
    banana.addImage("banana",bananaimage);
    foodgroup.add(banana);
    banana.velocityX=-4;
    banana.lifetime=200;
  }
}
 
function createObstacle(){
  if(World.frameCount%80 ===0){
    obstacle=createSprite(390,270,10,10);
    obstacle.addImage("Stone",obstacleimage);
    obstacle.scale=0.15;
    obstacle.velocityX=-7;
    obstacle.lifetime=200;
    obstaclegroup.add(obstacle);
  }
}

