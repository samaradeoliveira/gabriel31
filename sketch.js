const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

//corda, fruta, chão e coelho
var rope, fruit, ground, bunny;

//ligação
var fruit_con;

//imagens, c30
var bgImg, fruitImg, bunnyImg;

//botão
var cutB;

//animações: piscando, comendo, tristinho
var blinkImg, eatImg, sadImg;

function preload() {
  //imagens
  bgImg = loadImage('background.png');
  fruitImg = loadImage('melon.png');
  bunnyImg = loadImage('Rabbit-01.png');

  //animações
  blinkImg = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eatImg = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  
  //triste
  

  //ligar e desligar animações
  blinkImg.playing = true;
  //comer
  eatImg.playing = true;
  eatImg.looping = false;

  //----- sad: playing e lopping,  -----//



}

function setup() {
  createCanvas(500, 700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  cutB = createImg('cut_btn.png');
  cutB.position(220, 30);
  cutB.size(50, 50);
  cutB.mouseClicked(drop);

  //frameDelay  
  blinkImg.frameDelay = 15;
  eatImg.frameDelay = 15;
 //fazer o frameDelay para sad



//sprite coelho e outras características
  bunny = createSprite(230, 620, 100, 100);
  bunny.scale = 0.2;

  //carregar animações do coelho
  bunny.addAnimation('piscando', blinkImg);
  bunny.addAnimation('comendo', eatImg);
  //adicionar a animação do coelho chorando


  bunny.changeAnimation('piscando', blinkImg);





  //corda
  rope = new Rope(7, { x: 250, y: 30 });

  //chão
  ground = new Ground(200, 690, 600, 17);

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);

}

function draw() {
  background(51);

  image(bgImg, width / 2, height / 2, 490, 690);

  if (fruit != null) {
    image(fruitImg, fruit.position.x, fruit.position.y, 70, 70);
  }

  rope.show();

  ground.show();
  Engine.update(engine);


  //if para aplicar animação, aluno
  //primeiro: se a fruta colidir com o coelho
 
    //mudar a animação do coelho para "comendo"
    
 



  //if colisão da fruta com o chão
   if(fruit != null && fruit.position.y >= 650){
    //mudar a animação do coelho para chorando
    bunny.changeAnimation("chorando")
   }



  drawSprites();
}

function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}


//função de colisão para fruta e o coelho
function collide(body, sprite){
  if(body!=null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if(d<=80){
      World.remove(engine.world, fruit);
      fruit = null;
      return true;
    }
    else{
      return false;
    }
  }
}
