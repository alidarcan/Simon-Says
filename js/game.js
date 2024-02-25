let simonChoices = [];
let userChoices = [];
let currentLevel = 1;
let color = ["green", "red", "yellow", "blue"];
let started = false;

function simonSelect() {
  userChoices = [];
  let randomColor = color[Math.floor(Math.random() * 4)];
  simonChoices.push(randomColor);
  $("#" + randomColor)
    .fadeOut(100)
    .fadeIn(100);
  makeNoise(randomColor);
}

function makeNoise(randomColor) {
  let noise = new Audio("./sounds/" + randomColor + ".mp3");
  noise.play();
}

function userSelect(color) {
  if (started) {
    let pressedButton = $("#" + color);
    pressedButton.addClass("pressed");
    userChoices.push(color);
    check(userChoices.length - 1);
    makeNoise(color);
    setTimeout(function () {
      pressedButton.removeClass("pressed");
    }, 100);
  }
}

function check(level) {
  if (userChoices[level] === simonChoices[level]) {
    if (userChoices.length === simonChoices.length) {
      levelUp();
    }
  } else {
    started = false;
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    makeNoise("wrong");
    endGame();
  }
}

function levelUp() {
  currentLevel++;
  setTimeout(function () {
    $("#level-title").text("Level " + currentLevel);
    simonSelect();
  }, 1000);
}

function endGame() {
  $(".btn").off("click");
  $("#level-title").text("Game Over! Your level was " + currentLevel);
  setTimeout(newGame, 1500);
}

function newGame() {
  simonChoices = [];
  currentLevel = 1;
  $("#level-title").text("Press any key or click here to start.");
  $("#level-title").on("click", restart);
  $(document).on("keydown", restart);
}

function restart() {
  started = true;
  $("#level-title").text("Level " + currentLevel);
  $("#level-title").off("click");
  $(document).off("keydown");
  simonSelect();
  $(".btn").on("click", function (e) {
    userSelect(e.target.id);
  });
}

newGame();
