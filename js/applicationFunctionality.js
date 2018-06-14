var currentDate = null;
var amountOfCycles = 10;
var cycles = 1;
var timeDifference = [];
var audio = null;
var gameState = "INTRODUCTION";
var gameStages = 3;
var results = {};
var actualGameStage = 0;
var counting = false;

$(function () {
    var x = document.getElementById("moving-block");
    x.addEventListener("webkitAnimationIteration", animIteration);
    x.addEventListener("animationIteration", animIteration);
})

$(document).keypress(function (event) {
    if (event.which == 32) {
        if (!counting) {
            switch (gameState) {
                case "INTRODUCTION":
                    gameState = "GAME";
                    $('#message-container').html("Naciśnij spację, kiedy wskaźnik znajdzie się na środku paska.")
                    countTo(3);
                    break;
                case "BREAK":
                    gameState = "GAME";
                    $('#message-container').html("Naciśnij spację, kiedy wskaźnik znajdzie się na środku paska.")
                    audioStart(actualGameStage);
                    countTo(3);
                    break;
                case "GAME":
                    gameCycle();
                    break;
            }
        }
    }
});

function gameCycle() {
    var date = new Date();
    if (currentDate && cycles < amountOfCycles + 1 && timeDifference.length < cycles) {
        timeDifference.push(Math.abs(date - currentDate));
        $('#counter-container').empty();
    }
}
function gameStart() {
    var date = new Date();
    $('#moving-block').css("animation-play-state", "running")
    currentDate = date;
    actualGameStage++;
}
function animIteration() {
    var date = new Date();
    currentDate = date;

    if (timeDifference.length < cycles)
        timeDifference.push(null);

    cycles++;

    if (cycles > amountOfCycles) {
        $('#moving-block').css("animation-play-state", "paused")
        console.log(timeDifference);
        results[actualGameStage] = timeDifference;
        if (actualGameStage < gameStages) {
            timeDifference = [];
            cycles = 1;
            gameState = "BREAK";
            $('#message-container').html("Naciśnij spację, aby kontynuować.")
            $('#counter-container').empty();
        }
        else {
            $('#message-container').html("Koniec badania.")
            $('#counter-container').empty();
        }
        if (actualGameStage > 1)
            audioStop();
    }

}

function audioStart(numberOfAudio) {
    var audioPath;
    switch (numberOfAudio) {
        case 1:
            audioPath = 'content/audio1.mp3';
            break;
        case 2:
            audioPath = 'content/audio1.mp3';
            break;
    }
    if (audioPath) {
        audio = new Audio(audioPath);
        audio.play();
    }
}

function audioStop() {
    audio.pause();
    audio.load();
}

function countTo(max) {
    var counter = max;
    counting = true;
    $('#counter-container').html(max);
    (function addDot() {
        setTimeout(function () {
            if (counter-- > 0) {
                $('#counter-container').html(counter === 0 ? "START" : counter);
                addDot();
            }
            else {
                counting = false;
                gameStart();
            }
        }, 1000);
    })();
}