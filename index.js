///////////// computer input //////////////
var gamePattern= [];
var userClickedPattern = [];
var buttonColor =["red","blue","green","yellow"];
var level = 0 ;
var started = false ;

$(document).keypress(function () {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true ;
    }
 
  })



function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColor[randomNumber];
  gamePattern.push(randomChosenColour);
  
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  soundPlayer(randomChosenColour)

}


// function that play sounds accourding to the randomColor generated from the computer
function soundPlayer(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
  }


 
///////////////////// user input ////////////////////////////


$(".btn").on("click",function(event){
    // $(this).attr("id") instead of using the event 
 var userChosenButton = event.target.id
 //saving the user clicked button button
 userClickedPattern.push(userChosenButton) 

 soundPlayer(userChosenButton);
 animatePress(userChosenButton);

 // the last index of user chose
checkAnswer(userClickedPattern.length - 1)

})
 
///animation for the button when it get's clicked
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);

}


////////////// start the game ///////////////////////////



///// checking the user input
function checkAnswer(currentLevel) {
    //verifie si le clic actuel est correct
    if(userClickedPattern[currentLevel]=== gamePattern[currentLevel]  )
        {     //verfie si toute la sequence est terminee avec succes
            if( userClickedPattern.length === gamePattern.length){
                // Passer au niveau suivant après 1 seconde
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        }else{
     
        $("h1").text("Game Over, Press Any Key to Restart")
        soundPlayer("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
         $("body").removeClass("game-over")
        },200);
        startOver();
          }
        }
       

///////////////////// starting over /////////////
function startOver (){
    level=0;
    gamePattern =[];
    started= false
}







