const nextClicked = function() {
    console.log('next clciked log')
    let input = document.getElementById("player_name").value;
    if(input === ""){
        alert("enter player name")
    }
    else{ 
       //save name to local storage
        localStorage.setItem("playername",input)
        //show difficulty selection div
    let center_div = document.getElementById("center_div");
    center_div.style.height = '200px';
    center_div.innerHTML = '<object type="text/html" data="mode_select.html" style="min-width:100%; min-height: 101%;  style="overflow:hidden;" ></object>'
    }
    
}
document.querySelector("#next").addEventListener("click",nextClicked)