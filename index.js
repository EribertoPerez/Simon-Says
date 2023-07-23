let buttonColors = [`red`, `blue`, `green`, `yellow`];
let gamePattern = [];
let userClickedPattern = [];
let gameStart = false;
let level = 0;
$(document).one(`keypress`, () => {
    nextSequence();
    gameStart = true;
})
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    $(`h1`).text(`Level ${level}`);
    level++;
};
$(`.button`).click(function () {
    if (gameStart === false) { console.log(`turtle`); }
    else {
        let userChosenColor = $(this).attr(`id`);
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    }
});
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        };
    } else {
        $(`body`).addClass(`game-over`);
        setTimeout(() => {
            $(`body`).removeClass(`game-over`)
        }, 200);
        playSound('wrong');
        $(`h1`).text(`Game Over, Press any Key to Restart`)
        startOver();
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStart = false;
    $(document).one(`keypress`, () => {
        nextSequence();
        gameStart = true;
    })
}
function playSound(name) {
    let audio = new Audio(`sounds\\${name}.mp3`)
    audio.play();
};
function animatePress(currentColor) {
    $(`#` + currentColor).addClass(`pressed`);
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
};