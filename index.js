var simonArr = [];
var answerArr = [];
var currentLevel = 1;

function randomColorPick() {
  var colors = ["red", "blue", "yellow", "green"];
  var randomColor = colors[Math.floor(Math.random() * 4)];
  simonArr.push(randomColor);
  makeSound(randomColor);
  makeAnimation(randomColor);
}

function makeSound(color) {
  var color = new Audio("sounds/" + color + ".mp3");
  color.play();
}

function makeAnimation(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

// Clicking
function clickAnswer(e) {
  pickedColor = $(e.target).attr("id");
  answerArr.push(pickedColor);
  makeSound(pickedColor);
  makeAnimation(pickedColor);
  checkAnswer();
}

function checkAnswer() {
  for (var i = 0; i < answerArr.length; i++) {
    if (simonArr[i] === answerArr[i]) {
      if (answerArr.length === simonArr.length) {
        levelUp();
      }
    } else {
      endGame();
    }
  }
}

function game() {
  randomColorPick();
  $(".btn").on("click", function (e) {
    clickAnswer(e);
  });
}

function endGame() {
  $(".btn").off("click");
  flash();
  $("#level-title").html("Game Over<br>Restart ?");
  startGame();
}

function flash() {
  $("body").addClass("game-over");
  makeSound("wrong");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 300);
}

// Score
function levelUp() {
  currentLevel++;
  $("#level-title").text("Level " + currentLevel);
  answerArr = [];
  setTimeout(function () {
    randomColorPick();
  }, 2000);
}

// Starting
function startGame() {
  simonArr = [];
  answerArr = [];
  currentLevel = 1;
  $("#level-title").on("click", activateRestart);
  $(document).on("keydown", activateRestart);

  function activateRestart() {
    setTimeout(function () {
      game();
    }, 1000);
    $("#level-title").text("Level " + currentLevel);
    $(document).off("keydown");
    $("#level-title").off("click");
  }
}

startGame();
