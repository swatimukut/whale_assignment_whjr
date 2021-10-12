

var whale,whale_image
var ground, invisibleGround, groundImage;
var ran;
var cloudImage,balloon,balloon_image;
var bggroundImage;
var obstacle,obstacleImg1,obstacleImg2;
var rand,obstacleGroup1,obstacleGroup2;
var whaleSad,edges;
var gameState="serve", restart,restartImg;
var score=0;


//Preload function to load Images, Sounds,Animation
function preload(){
  whale_image = loadAnimation("whale_original_wob1.png","whale2_wob1.png","whale_wob3.png");
  whale_image2=loadAnimation("whale_right.png","whale2_right.png","whale3_right.png");
  whaleSad=loadAnimation("whale_sad_left.png");

  bggroundImage = loadImage("stillwater_background.jpg");
 
  obstacleImg1=loadImage("cargoShip.png");
  obstacleImg2=loadImage("garbage2.png");
  obstacleImg3=loadImage("cargoShip1.png");
  obstacleImg3=loadImage("net.png");
   
  oilSpill=loadImage("oilSpill.png");
  oilPipe=loadImage("oil_spill.png");
  netImg=loadImage("net.png");

  restartImg=loadImage("refresh.png");

  //Sounds
  introSound=loadSound("introSound.wav");
  jump=loadSound("jump.wav");
  loseSound=loadSound("loseSound.wav");
  gameOverSound=loadSound("gameOver.wav");
}

//For initial setup
function setup() {

 createCanvas(windowWidth,windowHeight);
  obstacleGroup1=new Group(); //Create groups to put all the related obstacles in one unit.
  obstacleGroup2=new Group();
  
 
  

  whale = createSprite(width-150,height/2-5,20,50);  //Create the whale Sprite
  whale.addAnimation("running", whale_image); //Add animations
  whale.addAnimation("right",whale_image2);
  whale.addAnimation("soSad",whaleSad);
  whale.scale = 0.20;
  
   //create a ground sprite
   ground=createSprite(whale.x,whale.y+50,100,20); //Create ground
   ground.visible=false; //make the ground invisible
   
  //whale.debug=true
  whale.setCollider("circle",0,0,40);  // To change the collider's shape to circle
 
  industryWastePipe=createSprite(width-100,360,20,40); // To display the industrial waste draining pipe
  industryWastePipe.addAnimation("oil",oilPipe);
  industryWastePipe.scale=0.8;
  industryWastePipe.visible=false;

  restart=createSprite(width/2,200,20,20);  //For restart icon
  restart.addImage("restart",restartImg);
  restart.visible=false;  // To make invisible
  restart.scale=0.2;   // To scale it's size 

}

function draw() {
  
  edges=createEdgeSprites();
  whale.collide(edges);
//GAMESTATE SERVE
 if(gameState=="serve"){    

      background("aqua");
      introSound.play();
      restart.visible=false;
      textSize(25);
      strokeWeight(10);
      fill("red");
      textFont("Comic Sans MS");
      text("",30,30)
      text(" Hello kids!!! I know a beautiful whale, her name is Cari. She loves to swim in high sea.",30,60);
      text(" Her pink color attracts lot of attention and she enjoys every bit of it.",30,90); 
      text(" To flaunt her shiny rosy skin she breach high up to the sky. But, whale breaching has become a challenge for her nowadays. ",30,120);
      text(" As lately, due to human intrusion in the silent clean sea, she has seen lot of trash, spilled oil and one day, ",30,150);
      text(" she even hit the ship. Then the other day she had a narrow escape, when a fishing net got stuck to her tail!", 30,180);
      text(" Now you will help little Cari to jump peacefully and enjoy the day!!!", 30,210);
      textSize(40);
      fill("coral")
      text("   Press ENTER to Start.",20,270);
      text("   For right: Use Right Arrow.",20,330);
      text("   For left: Use Left Arrow.",20,410);
      
      whale.addAnimation("running", whale_image);
      whale.scale=.4;

      if(keyDown("enter")&&gameState=="serve"){
        gameState="play";
      }
  
 }

 //GAME STATE SERVE
 if(gameState=="play"){
  
    background(bggroundImage);
    score=score+1;
    textSize(20);
      strokeWeight(10);
      fill("yellow");
      textFont("Comic Sans MS");
      text("Score: "+score,50,50);
      
    whale.scale=0.25;
    //whale.collide(ground);
    if(keyDown("left")&& whale.y >= 300) {
        jump.play();
        whale.velocityY = -10;
        whale.velocityX=-4;
        ground.velocityX=whale.velocityX;
        whale.changeAnimation("running", whale_image);
    }

    if(keyDown("right")&&whale.y>=300){
        jump.play();
        whale.changeAnimation("right",whale_image2);
        whale.velocityY = -10;
        whale.velocityX=4;
        ground.velocityX=whale.velocityX;
        industryWastePipe.visible=true;
       
    }
    
      whale.velocityY = whale.velocityY + 0.2;
      

      SpawnObstacle();

    if(industryWastePipe.visible==true){
       rightSideDanger();
    }

   if(obstacleGroup1.isTouching(whale)||obstacleGroup2.isTouching(whale)){
    
      score=score;
      loseSound.play();
      whale.changeAnimation("soSad",whaleSad);
      whale.velocityY=4; 
      ground.destroy();
      whale.velocityX=0;
     
    
    }

   if(whale.y>height-100){
     gameState="end";
  }
     //stop whale from falling down
    whale.collide(ground);

 }

 //GAME STATE END
 if(gameState=="end"){
   
   score=0;

    whale.velocityX=0;
    whale.velocityY=0; 
    whale.changeAnimation("soSad",whaleSad);
    
    restart.visible=true;
  
    obstacleGroup1.setVelocityXEach(0);
    obstacleGroup1.setLifetimeEach(-1);
    obstacleGroup2.setVelocityXEach(0);
    obstacleGroup2.setLifetimeEach(-1); 
    if(mousePressedOver(restart)){
      whale.destroy();
    
      restart1();
    }
}

  drawSprites();
  
}

function SpawnObstacle(){

  if(frameCount%350==0){
    var obstacle=createSprite(10,height/2-30,20,40);
    obstacle.velocityX=5;
    obstacle.scale=0.5;
    obstacle.lifetime=width;

    ran= Math.round(random(1,4));
    switch(ran){
      case 1: obstacle.addImage("ship",obstacleImg1);
              break;
      case 2: obstacle.addImage("garbage",obstacleImg2);
              break; 
      case 3: obstacle.addImage("fishingNet",netImg);
               break;
      case 4: obstacle.addImage("cargo2",obstacleImg3);
               break;           
      default: break;             
    }
    obstacleGroup1.add(obstacle);
  }
}

function rightSideDanger(){

  if(frameCount%300==0){
    var obstacle2=createSprite(width-150,460,20,40);
    obstacle2.addImage("oil",oilSpill);
    obstacle2.velocityX=-2;
    obstacle2.scale=0.7;
    obstacle2.lifetime=width;
    obstacleGroup2.add(obstacle2);
    
  }
}

function restart1(){
  whale = createSprite(width-150,height/2-5,20,50);
  whale.addAnimation("running", whale_image);
  whale.addAnimation("right",whale_image2);
  whale.addAnimation("soSad",whaleSad);
  whale.changeAnimation("running", whale_image);
  whale.setCollider("circle",0,0,30);
  ground=createSprite(whale.x,whale.y+50,100,20);

  ground.visible=false;
  whale.scale=0.4;
  whale.collide(ground);
  obstacleGroup1.destroyEach();
  obstacleGroup2.destroyEach();
  industryWastePipe.visible=false;
  gameState="serve";
}
