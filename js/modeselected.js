let isEasy = false;
let difficultylevl = "";



const easySelected = function() {
    console.log('play clciked log')
    //show difficulty selection div
    window.open('playButtonPage.html','_self');
    isEasy = true
    difficultylevl = "Easy"
    let levelsValue = {
        levelChoosed:difficultylevl,
        sendLevelChossed:isEasy
    };

    localStorage.setItem("difficultylevelValue",JSON.stringify(levelsValue));
}

const hardSelected = function() {
    console.log('play clciked log')
   // let input = document.getElementById("player_name").value;
    // setCookie("player_name",input,1);

    //show difficulty selection div
    window.open('playButtonPage.html','_self');
    isEasy = false
    difficultylevl = "Hard"

    let levelsValue = {
        levelChoosed:difficultylevl,
        sendLevelChossed:isEasy
    };

    localStorage.setItem("difficultylevelValue",JSON.stringify(levelsValue));
}
