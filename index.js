var color_array = ["green", "red", "yellow", "blue"];
var got_color = [];
var picked_color = [];

var started = false;

$(document).keypress(function () {
    if (!started) {
        level = 0;
        started = true;
        generator();
    }
});

function generator() {
    level++;
    $("h1").html("level " + level);
    var z = Math.random();
    z = Math.floor(z * 4);
    var got = color_array[z];
    got_color.push(got);
    animate(got);
}

$(".btn").click(function () {
    var picked = $(this).attr("id");
    console.log(picked);
    picked_color.push(picked);
    checkbox(picked_color.length - 1);
});

function checkbox(n) {
    if (picked_color[n] === got_color[n]) {
        animate(picked_color[n]);
        if (picked_color.length === got_color.length) {
            picked_color = [];
            setTimeout(function(){
                generator();
            },300);
        }
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        animate("wrong");
        $("h1").html("Game Over, Press Any Key to Restart");
        game_over();
    }
}

function animate(animate_color) {
    var audio = new Audio("sounds/" + animate_color + ".mp3");
    audio.play();
    if (animate_color !== "wrong") {
        document.querySelector("#" + animate_color).classList.add("pressed");
        setTimeout(function () {
            document.querySelector("#" + animate_color).classList.remove("pressed");
        }, 100);
    }
}

function game_over() {
    started = false;
    got_color = [];
    picked_color=[];
}