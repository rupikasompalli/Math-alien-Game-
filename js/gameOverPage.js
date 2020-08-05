

const getsaveDetailsFromDb = JSON.parse(localStorage.getItem("savePlayDetail"));

if(getsaveDetailsFromDb === undefined){
    console.log("Name Not Found");
    document.querySelector(".save-div").innerText = "No name store in db"
}
else{
     parent.document.getElementById("save-div1").innerText =  `Player name is ${getsaveDetailsFromDb.PlayerName}, "\n" Hit Count: ${getsaveDetailsFromDb.Hit}, "\n" Miss Count: ${getsaveDetailsFromDb.Miss}, "\n" Difficulty Level: ${getsaveDetailsFromDb.Difficulty}`        
}
