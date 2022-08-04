var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keypress", function() {
  if(!started) {
    nextSequence();
    started = true;
  }
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function animateMistake() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function nextSequence(){
  userClickedPattern = [];
  $("h1").text("Level " + level)
  level = level + 1
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound(name="wrong");
    animateMistake();
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
