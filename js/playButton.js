const showStartGame = function() {
    parent.window.open('startgame.html','_self');
}
document.querySelector("#play").addEventListener("click",showStartGame)