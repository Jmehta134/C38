class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      car1 = createSprite(displayWidth/5,displayHeight/4,40,40);
      car2 = createSprite(displayWidth/5*2,displayHeight/4,40,40);
      car3 = createSprite(displayWidth/5*3,displayHeight/4,40,40);
      car4 = createSprite(displayWidth/5*4,displayHeight/4,40,40);
      cars = [car1,car2,car3,car4];
    
    }
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      background(20);
      //var display_position = 130;
      var x = 0;
      var y = 0;
      var index = 0;
      for(var plr in allPlayers){
        index = index+1;
        x += 200;
        y = displayHeight-allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y; 
        if (index === player.index){
          cars[index-1].shapeColor=rgb(255,0,0);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          /*
          fill("red");
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)*/
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites();
  }
}    
