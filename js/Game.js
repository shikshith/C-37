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
    }
    //cretethe car sprites and store them in the array cars
    car1=createSprite(100,200)
    car2=createSprite(300,200)
    car3=createSprite(500,200)
    car4=createSprite(700,200)
    cars=[car1,car2,car3,car4]
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //index of the array is set to zero
      var index=0
      //x and y are the positions of the car
      var x =0
      var y;
      
      for(var plr in allPlayers){
        //increase the index by 1 for every player
        index=index + 1
        //the car is kept at a distance of 200 in x direction from each other
        x=x+200
        //place the car at the y position getting the data from the data base
        y=displayHeight-allPlayers[plr].distance;
        //place the car at x and y
        //for every player we increase the index by 1 but the car in the cars array start with an index of 0, so we use cars[index-1] for the current players car
        cars[index-1].x=x;
        cars[index-1].y=y
        if (index === player.index){
          //display the current player car in red colour
          cars[index-1].shapeColor="red"
          //place the camera at the cars position
          camera.position.x=displayWidth/2
          camera.position.y=cars[index-1].y 
        }
       
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();
  }
}
