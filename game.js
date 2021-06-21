class Game {
    constructor() {
    }
    getGameState() {
        db.ref("gameState").on("value", function (data) {
            gameState = data.val();
        });
    }
    updateGameState(state) {
        db.ref("/").update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await db.ref("playerCount").once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        player1 = createSprite(100, 100)
        player1.shapeColor="red"
        player2 = createSprite(300, 100)
        player2.shapeColor = "blue"
        player3 = createSprite(100, 400)
        player3.shapeColor = "green"
        player4 = createSprite(40, 750)
        player4.shapeColor = "yellow"
        players = [player1, player2, player3, player4]
    }
    play() {
        form.hide()
        Player.getPlayerInfo()
        if (allPlayers) {
            console.log(player.score)
            var index = 0
            var scoreArray = []
            for(var i in allPlayers){ 
                index = index+1
                players[index - 1].x = allPlayers[i].x
                players[index - 1].y = allPlayers[i].y
                scoreArray.push(allPlayers[i])
            }
            for(var i = 0; i < scoreArray.length-1; i++){
                for(var j = i+1;j<scoreArray.length-1;j++){
                if (scoreArray[j-1].score<scoreArray[j].score){
                    var temp = scoreArray[j-1]
                    scoreArray[j-1] = scoreArray[j]
                    scoreArray[j] = temp
                }
            }
            }            
            console.log(scoreArray)
            text(allPlayers["player1"].name+" : "+allPlayers["player1"].score,300,100)
            text(allPlayers["player2"].name+" : "+allPlayers["player2"].score,300,200)
            text(allPlayers["player3"].name+" : "+allPlayers["player3"].score,300,300)
            text(allPlayers["player4"].name+" : "+allPlayers["player4"].score,300,400)
            this.spawnFood();
            if(frameCount%50 == 0 && frameCount > 250){
                food.splice(0,1)
            }
        }
        if(food !== undefined){
            for(var i in food){
              if(food[i].isTouching(players[player.index-1])){
                player.score = player.score+1
                player.updateData()
                food[i].destroy();
              }
            }
          }
        if (keyIsDown(UP_ARROW)) {
            player.y = player.y - 10
        }
        if (keyIsDown(DOWN_ARROW)) {
            player.y = player.y + 10
        }
        if (keyIsDown(RIGHT_ARROW)) {
            player.x = player.x + 10
        }
        if (keyIsDown(LEFT_ARROW)) {
            player.x = player.x - 10
        }
        drawSprites();
        player.updateData();
    }
    spawnFood() {
        if(frameCount%50 == 0){
        var banana = createSprite(400, 200, 10, 10)
        banana.addImage("banana", bananaImage)
        banana.scale = 0.5
        banana.x = random(0, windowWidth);
        banana.y = random(0, windowHeight);
        banana.lifetime = 100
        food.push(banana)
        }
    }
}