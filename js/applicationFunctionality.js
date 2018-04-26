var currentDate = null;
var amountOfCycles = 5;
var cycles = 1;
var timeDifference = [];

$(function () {
    var x = document.getElementById("moving-block");
    x.addEventListener("webkitAnimationIteration", animStart);
    x.addEventListener("animationIteration", animStart);
})

$(document).keypress(function (event) {
    if (event.which == 32) {
        var date = new Date();
        if (currentDate && cycles < amountOfCycles + 1 && timeDifference.length < cycles) {
            var text = $('#result-container').html();
            $('#result-container').html(text + "<span class='red'>" + date + "</span><br/>" + "<span class='green'>" + Math.abs(date - currentDate) + "</span><br/>");
            timeDifference.push(Math.abs(date - currentDate));
        }
        else if (cycles === 1) {
            $('#moving-block').css("animation-play-state", "running")
            currentDate = date;
            $('#result-container').html("<span>" + date + "</span><br/>");
        }
    }
});

function animStart() {
    var text = $('#result-container').html();
    var date = new Date();
    currentDate = date;
    
    if (timeDifference.length < cycles)
        timeDifference.push(null);

    cycles++;
    
    if (cycles < amountOfCycles + 1){
        $('#result-container').html(text + "<span>" + date + "</span><br/>");
        $('#cycles-container').html(cycles);
    }
    else{
       $('#moving-block').css("animation-play-state", "paused")
        console.log(timeDifference); 
    }
}
