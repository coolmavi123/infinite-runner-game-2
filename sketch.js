var galaxyImg,galaxy;
var astoriodImg,astoriod,astoriodsGroup;
var climberImg,climber,climbersGroup;
var spacecraftImg,spacecraft;
var invisibleBlockGroup,invisibleBlock;
var gamestate="play";

function preload(){
    galaxyImg=loadImage("galaxy.png");
    astoriodImg=loadImage("astoriod.png");
    climberImg= loadImage("climber.png");
    spacecraftImg=loadImage("spacecraft.png");
    spookySound=loadSound("spooky.wav");

}

function setup() {
    createCanvas(600,600);
    spookySound.loop();
    galaxy= createSprite(300,300);
    galaxy.addImage("galaxy",galaxyImg);
    galaxy.velocityY= 1;

    astoriodsGroup= new Group();
    climbersGroup= new Group();
    invisibleBlockGroup= new Group();

    spacecraft= createSprite(200,200,50,50);
    spacecraft.scale=0.3;
    spacecraft.addImage("spacecraft",spacecraftImg);

 
}

function draw(){
    background(255);
    if(galaxy.y>=600){
        galaxy.y=300
    }
    if(gamestate==="play"){
        if(keyDown("left_arrow")){
            spacecraft.x=spacecraft.x - 3;
        }
        if(keyDown("right_arrow")){
            spacecraft.x=spacecraft.x + 3;
        }
        if(keyDown("space")){
            spacecraft.velocityY= -10;
        }

    }
    spacecraft.velocityY=spacecraft.velocityY + 0.8;

          spawnAstoriods();



if(climbersGroup.isTouching(spacecraft)){
    spacecraft.velocityY= 0;
}
if(invisibleBlockGroup.isTouching(spacecraft) || spacecraft.y > 600){
    spacecraft.destroy();
    gamestate= "end"


}


drawSprites();




    
}
if(gamestate==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250)

}

function spawnAstoriods()
{
    if(frameCount % 240 === 0){
        var astoriod = createSprite(200, -50);
        var climber = createSprite(200, 10);
        var invisibleBlock= createSprite(200,15);
        invisibleBlock.width= climber.width;
        invisibleBlock.height= 2;
        astoriod.x=Math.round(random(120,400));
        climber.x=astoriod.x;
        invisibleBlock.x=climber.x;
        astoriod.addImage(astoriodImg);
        climber.addImage(climberImg);
        astoriod.velocityY= 1;
        climber.velocityY= 1;
        invisibleBlock.velocityY= 1;
        spacecraft.depth=astoriod.depth;
        spacecraft.depth=spacecraft.depth+1;

        astoriod.lifetime=800;
        climber.lifetime=800;
        invisibleBlock.lifetime=800;
        astoriodsGroup.add(astoriod);
        invisibleBlock.debug=true;
        climbersGroup.add(climber);
        invisibleBlockGroup.add(invisibleBlock);



    }
}
    
    

  
