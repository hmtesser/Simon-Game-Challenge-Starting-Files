let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let start = true;
let randomChosenColour;



$(document).on("keypress", function(){
    if(start == false){
        return '';
    }else{
        nextSequence();
        level = 1;
        $("h1").text(`level ${level} started`);
    }
  
    
})

function nextSequence(){
    userClickedPattern = [];
    start= false;
    let randomNumber = (Math.random() * 4)
    randomNumber = Math.floor(randomNumber);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playAudio(randomChosenColour);
    level++;
    $("h1").text(`level ${level} started`);
}



function playAudio(color){
let audioClick = new Audio(`sounds/${color}.mp3`)
audioClick.play();
// audioClick.play(`sounds/${color}.mp3`).catch(error => {
//     console.log('erro ao tocar audio', error);
// })

}
 
$(".btn").click(function() {  
   
    userClickedPattern.push(this.id);
    $("#values").text(gamePattern);
    playAudio(this.id)
    checkAnswer(userClickedPattern.length -1)
    
})




function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    $("#" + currentColour).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + currentColour).removeClass("pressed");
}


// check if the player got the colours corrected;

function checkAnswer(currentLevel){
 if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    if(userClickedPattern.length == gamePattern.length){
        setTimeout(function() {
            game();
        },1000);
    }
 }else {
    $("body").addClass('game-over');
    setTimeout(function() {
        $("body").removeClass('game-over')
    },200);
    console.log('fail');
    $("body").on('')
    $("h1").text('restart the game pressing any letter on keyboard');
    start = true;
    gamePattern = [];
 }
}

function game(){
    nextSequence();
    playAudio(randomChosenColour);
}