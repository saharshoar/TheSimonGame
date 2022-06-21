buttonColors = ["red","blue","green","yellow"];
gamePattern = [];
userClickedPattern =[];

// 4. add audio
function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
};

function nextSequence(level){
  // increase the level by 1
  level+=1;
  $("h1").text("Level "+level);

  // 1. choose a color randomly
  var randomNumber= Math.floor (Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  // 2. add random color to the list (in order)
  gamePattern.push(randomChosenColor);

  // 3. select the button with the same id & animate a falsh
  $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  console.log("gamePattern: "+gamePattern);
  return randomChosenColor;
};


// 6. add animations to user clicks
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
};

// 9. Restart the game
function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern=[];
};

// 8. check user answer
function checkAnswer(currentLevel){
  var i = 0;
  for (i ; i<=currentLevel; i++){
    if (userClickedPattern[i] == gamePattern[i]){
      console.log("success");
    } else {
      console.log("wrong");
      $("h1").text("Game Over, Press Any Key to Restart!");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      playSound("wrong");
      startOver();
      break;
    }
  }

  if (i-1 == currentLevel){
    setTimeout(function(){
      nextSequence(currentLevel+1);
    },1000);
    userClickedPattern = [];
  }
};

// 5. detect and save whick buttons are clicked
$(".btn").click (function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (userClickedPattern.length == gamePattern.length){
    checkAnswer(userClickedPattern.length-1);
  }
});


// 7. Start the game
$(document).keypress (function(){
  startOver();
  var level = 0;
  var name = nextSequence(level);
});
$("#start").click (function(){
  startOver();
  var level = 0;
  var name = nextSequence(level);
  $("#start").text("Restart");
});
