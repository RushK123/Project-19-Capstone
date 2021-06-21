/* Maria is the best runner in the world however she is sucked into a dimension where she has to
run and collect gold coins so that she lives, if she dies the world and game go into the END STATE
which sends the coins from the game to wreak havoc in the real world. Will you aid Maria in her 
goal? */



var coinAnimation, girlAnimation, coins, girlrun, invGround; 
var backsub, backImg, coinGroup;
var score = 0;
var gamestate = 1;


function preload(){
    coinAnimation = loadAnimation("coin1.png", "coin2.png","coin3.png","coin4.png","coin5.png","coin6.png","coin7.png","coin8.png",);
    girlAnimation = loadAnimation("girl1.png", "girl2.png", "girl3.png", "girl4.png", "girl5.png", "girl6.png", "girl7.png");
    backImg = loadImage("19333403.jpg");
}

function setup() {
    createCanvas(1000,400);

    backsub = createSprite(300,200,50,50);
    backsub.scale = 0.15;
    backsub.addImage(backImg);

    girlrun = createSprite(150, 350, 50 ,50);
    girlrun.scale = 0.14;
    girlrun.addAnimation("girl",girlAnimation);

    invGround = createSprite(300,400,1000,10)
    invGround.visible = false;

    coinGroup = new Group();

}

function draw() {
    var edges = createEdgeSprites();
    backsub.velocityX = -3;
    if (backsub.x < 0) {
        backsub.x = width / 2.5;
      }
    if (keyDown("space")) {
        girlrun.velocityY = -10;  
    }

    girlrun.velocityY += 0.5;
    girlrun.collide(invGround);

    if (girlrun.collide(edges)){
        gameEnd();
        backsub.velocityX = 0;
    }

    if (frameCount % 60 == 0){
        money();
    }


    if (girlrun.isTouching(coinGroup)){
        score += 1;
        coins.destroy();
    }
    
    drawSprites();

    fill("red")
    textSize(15);
    text("Score: " + score, 400,50);



    
}

function gameEnd(){
    girlrun.destroy();
    backsub.destroy();
    coinGroup.destroyEach();
    background(0);
    fill("yellow");
    textSize(25);
    text("Game Over", 300, 200);
}


function money(){
    coins = createSprite(Math.round(random(200,600)),200,50,50);
    coins.scale = 0.3;
    coins.addAnimation("coin", coinAnimation);
    coins.velocityX = -1.5;
    coins.lifetime = 200;
    coinGroup.add(coins);
}