var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;


// starting of game
$(document).on("keypress", function() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});


function nextSequence() {
  userClickedPattern = [];

  var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  level = level + 1;
  $("h1").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


$(".btn").on("click", function() {
  var userChosedColor = $(this).attr("id");
  userClickedPattern.push(userChosedColor);
  playSound(userChosedColor);
  checkAnswer(userClickedPattern.length - 1);
});



function animatePress(currentColor) {
  $(currentColor).addClass("pressed");

  setTimeout(function() {
    $(currentColor).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over. Press any key to start again");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
