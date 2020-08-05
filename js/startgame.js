
let cannonBlast = {
    top: 650,
    left: 550
};

let plank = {
    top: 750,
    left: 0
};



let bullets = [];
let getspaceShipquestionNo = "";
let getcannonquestionNo = 0;
let savePressed = false;
console.log("bullet EMPTY");

let enemies = [];

let answers = [];
let answerIndex = 0;

let hitCount = 0;
let missCount = 0;

let speed = 0;

let enemyPositions = [
    { top: 100,left: 100 },
    { top: 100,left: 360 },
    { top: 100,left: 600 },
    { top: 100,left: 840 },
    { top: 100,left: 1080 }
];

const nameFromDb = localStorage.getItem("playername");

if(nameFromDb === undefined){
    console.log("Name Not Found");
}
else{
    console.log(`Name is: ${nameFromDb}`);
}




const difficultylevelFromDb = JSON.parse(localStorage.getItem("difficultylevelValue"));

if(difficultylevelFromDb === undefined){
    console.log("Difficluty Not Found");
}
else{
     console.log(`diffucly level choosen ${difficultylevelFromDb.levelChoosed}, "\n" Boolean value: ${difficultylevelFromDb.sendLevelChossed}`);        
}


let gameOver = false;
let isAudioPlaying = true;

/// Handle coutndown timer
let gameTime=90;
let gameCounter= undefined;
const startgameTimer = function()
{
    gameTime = gameTime - 1;
    console.log("timer"+gameTime);
  if (gameTime <= 0)
  {
     clearInterval(gameCounter);
     document.getElementById("timer").innerHTML = 0 + " secs";

     bullets = [];
     console.log("bullet EMPTY");
     document.getElementById("enemies").innerHTML = "";
     gameOver = true;
    alert("You won the Game!!!Hurray!!")
    gameOverPage();
     
     return;
  }

  document.getElementById("timer").innerHTML = gameTime + " secs";
}

window.onload=function(){
    gameCounter = setInterval(startgameTimer, 1000);
    addCanon();

}


document.onkeydown = function(e) {

    if(gameOver == false){
        if (e.keyCode == 37) { // LEFT
            if (cannonBlast.left > 30) {
                cannonBlast.left = cannonBlast.left - 50;
                moveCanon();
            }
         } else if (e.keyCode == 39) { // RIGHT
            if (cannonBlast.left < 1110) {
                cannonBlast.left = cannonBlast.left + 50;
                moveCanon();
            } 
         } else if (e.keyCode == 32) { // SPACE 
            bullets.push({
                left: cannonBlast.left + 15,
                top: cannonBlast.top
            })
            console.log("bullet fired" + bullets.length)
            drawBullet();
         }
         if(e.target == document.body) { /// To make page not move with key presses
            e.preventDefault();
         }
    } 
}

const toggleAudio=function(){
    if (isAudioPlaying) {
        document.getElementById("my_audio").pause();
        document.getElementById("audio-btn").style.backgroundImage = "url(images/mute.png)";
        isAudioPlaying = false;
    } else {
        document.getElementById("my_audio").play();
        document.getElementById("audio-btn").style.backgroundImage = "url(images/unmute.png)";
        isAudioPlaying = true;
    }
}

const moveCanon = function() {
    document.getElementById("canon").style.left = cannonBlast.left + "px";
}

const drawBullet = function() {
    document.getElementById("bullets").innerHTML = "";
    for (let bullet = 0; bullet<bullets.length; bullet = bullet + 1) {
        document.getElementById("bullets").innerHTML += `<div class='bullet' style ='left:${bullets[bullet].left}px; top:${bullets[bullet].top}px;'></div>`;
        console.log("bullet top draw " + bullets[bullet].top);
    }
}

const moveBullet = function() {
    console.log("bullet top called " + bullets.length);
    for (let bullet = 0; bullet<bullets.length; bullet = bullet + 1) {
        bullets[bullet].top = bullets[bullet].top - 20;
        console.log("bullet top move " + bullets[bullet].top);
    }
}

const drawEnemies = function() {
    document.getElementById("enemies").innerHTML = "";
    for (let enemy = 0; enemy<enemies.length; enemy = enemy + 1) {
        let Enemy = enemies[enemy];
        let position = Enemy.enemyPosition;
        document.getElementById("enemies").innerHTML += `<div class='enemy' style ='left:${position.left}px; top:${position.top}px;'><p>${Enemy.enemyLabel}</p></div>`;
    }
}

const  moveEnemies = function() {
    for (let enemy = 0; enemy<enemies.length; enemy = enemy + 1) {
        let Enemy = enemies[enemy];
        let position = Enemy.enemyPosition;
        position.top = position.top + Enemy.speed;
    }
}

const addLabelOnCanon = function() {
    let label = document.getElementById("canon_value");
    //let label = canon.getElementById("canon_value");
    answerIndex = Math.floor(Math.random()*answers.length);
    label.innerHTML = answers[answerIndex].toString();  
}

const updateMissCount = function() {
    missCount += 1;
    parent.document.getElementById("missValue").innerText = missCount;
}

const updateHITCount = function() {
    hitCount += 1;
    parent.document.getElementById("hitValue").innerText = hitCount;
}


const loadEnemies = function(startAtTop) {
    answers = [];
    enemies = [];
    bullets = [];
    console.log("bullet EMPTY");
    
    for (let i = 0; i<enemyPositions.length; i = i + 1) {
        let n1 = getRandomInt(1,25);
        let n2 = getRandomInt(1,9);
    
        if(difficultylevelFromDb.sendLevelChossed === true){
            speed = getRandomInt(1,5)
            console.log("Easy speed");
        }
        else{
             speed = getRandomInt(5,12)
        }
        
        if (startAtTop) {
            let enemyPosition = enemyPositions[i];
            enemyPosition.top = 100;
            let Enemy = {
                enemyPosition: enemyPosition,
                speed: speed,
                enemyLabel: n1.toString().concat("+").concat(n2.toString()),
                enemyValue: n1+n2
            };
            enemies.push(Enemy);
        } else {
            let Enemy = {
                enemyPosition: enemyPositions[i],
                speed: getRandomInt(1,8),
                enemyLabel: n1.toString().concat("+").concat(n2.toString()),
                enemyValue: n1+n2
            };
            enemies.push(Enemy);
        }
        answers.push(n1+n2);
    }
}

const collisionDetection = function() {
    for (let enemyIndex = 0; enemyIndex<enemies.length; enemyIndex = enemyIndex + 1) {
        let enemy = enemies[enemyIndex];
        let position = enemy.enemyPosition;
        for (let bullet = 0; bullet<bullets.length; bullet = bullet + 1) {
              if ((bullets[bullet].top <= position.top + 100) && (bullets[bullet].top > position.top) && (bullets[bullet].left >= position.left) && (bullets[bullet].left <= position.left + 100)) {
                  if (enemy.enemyValue === answers[answerIndex]){
                    updateHITCount(); 
                    loadEnemies(true);
                  }else{
                    console.log("MISS");
                    updateMissCount(); 
                    loadEnemies(false)
                  }
                  
                  //enemies.splice(enemyIndex,1); /// This is for removing the enemy
                  bullets.splice(bullet,1);
                  console.log("bullet REMOVED");
                  addLabelOnCanon();
                 
              }
        }
        if ((plank.top <= position.top + 150)) {
            console.log("PLANK HIT");
            bullets = [];
            console.log("bullet EMPTY");
            parent.document.getElementById("enemies").innerHTML = "";
            gameOver = true;
            clearInterval(gameCounter);
            drawBullet();
        }
        if ((cannonBlast.top <= position.top + 150) && (cannonBlast.top > position.top) && (cannonBlast.left >= position.left) && (cannonBlast.left <= position.left + 100)) {
            console.log("CANON HIT");
            bullets = [];
            console.log("bullet EMPTY");
            parent.document.getElementById("enemies").innerHTML = "";
            gameOver = true;
            clearInterval(gameCounter);
            drawBullet();
        }
    }
}



//can set a loop for bullets to move at high speed
const bulletLoop = function() {
    if (gameOver == false) {
        setTimeout(bulletLoop,50);
        moveBullet();
        drawBullet();
    }
}

const gameLoop = function() {
    if (gameOver == true) {
        document.getElementById("canon").style.display = 'none';
        alert("game over");
    } else { 
        setTimeout(gameLoop,150); 
        moveEnemies();
        drawEnemies();
        collisionDetection();
    }
}

const getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const addCanon = function() {
   
    document.getElementById("plank").style.display = 'block';
    document.getElementById("score").style.display = 'block';
    document.querySelector("#canon").style.display = 'block';
    loadEnemies(true);
    gameLoop();
    bulletLoop();
    addLabelOnCanon();
      
}

const saveDetailsValueQuestion = function(){
    for (let enemyIndex = 0; enemyIndex<enemies.length; enemyIndex = enemyIndex + 1) {
        let enemy = enemies[enemyIndex];
                  if (enemy.enemyValue === answers[answerIndex]){
                    getspaceShipquestionNo = enemy.enemyLabel;
                    getcannonquestionNo = answers[answerIndex]; 
                  }
    }                   
}
//save game
const saveGameClicked = function() {
    console.log("Save clicked")
    saveDetailsValueQuestion();
    let saveGameDetailsValue = {
        "PlayerName":nameFromDb,
        "Hit":hitCount,
        "Miss":missCount,
        "Difficulty":difficultylevelFromDb.levelChoosed,
        "Time":gameTime,
        "cannonNo":getcannonquestionNo,
        "spaceshipquestion":getspaceShipquestionNo
    }
    
    localStorage.setItem("savePlayDetail",JSON.stringify(saveGameDetailsValue));
    
    window.open('savePage.html','_self');
}
document.querySelector("#save-btn").addEventListener("click",saveGameClicked);

const gameOverPage = function(){
    console.log("Game over");
    let saveGameDetailsValue = {
        "PlayerName":nameFromDb,
        "Hit":hitCount,
        "Miss":missCount,
        "Difficulty":difficultylevelFromDb.levelChoosed,
        "Time":gameTime,
        "cannonNo":getcannonquestionNo,
        "spaceshipquestion":getspaceShipquestionNo
    }
    localStorage.setItem("savePlayDetail",JSON.stringify(saveGameDetailsValue))

     window.open('gameOverPage.html','_self');
}

