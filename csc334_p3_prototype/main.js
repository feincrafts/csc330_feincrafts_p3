
/*

TODO

Add volume change functionality

Add upload functionality (if time)

Add loop functionality (compare to og)

Fetch playlist dynamically

*/

var isPaused = false;

const pauseSrc = "https://64.media.tumblr.com/7a88c8ca5fc71e66f92d9863b69702a3/6b64d8db2609dbea-02/s250x400/43d67eeb2ecdacb83a81592626438a39635ae1d4.png"
const playSrc = "https://64.media.tumblr.com/c39172e9841a9e2782e03cde86bed9e2/6b64d8db2609dbea-6c/s250x400/66aa04bbf365ae37d111e5eb1a0d5a2d40a9e16c.png"

var pauseButton = document.getElementById('playbtn');
var image = pauseButton.querySelector('img');

function pausePlay(){   

    // if paused, we want it to flip to play
    if (isPaused) {
        image.src = playSrc;
    }
    // else it's playing, so we want it to flip to pause
    else {
        image.src = pauseSrc;
    }
      
    isPaused = !isPaused;

}

pauseButton.addEventListener('click', pausePlay);  

// TODO: pull array data from somewhere and display dynamically

var playlist = ["Song1", "Song2", "Song3", "Song4"];
var currentSong;

// Credits to geeksforgeeks
var songlist = document.getElementById("playlist");
for (i = 0; i < playlist.length; ++i) {
    let li = document.createElement('li');
    li.innerText = playlist[i];
    songlist.appendChild(li);
}

var liElements = document.querySelectorAll("#playlist li");
var currentSongPos;
var title = document.getElementById("currentstation")

// Credits to https://stackoverflow.com/questions/40956717/how-to-addeventlistener-to-multiple-elements-in-a-single-line
document.addEventListener('click', function(e){

    if(e.target.tagName=="LI"){

        currentSong = e;
        highlightCurrentSong(e);

        // grab position of current song
        currentSongPos = Array.from(liElements).indexOf(e.target);
        title.innerHTML = currentSong.srcElement.innerText;
        
    }
})

function highlightCurrentSong(e){
    //Resets colors of other boxes
    clearHighlights();
    
    //Set current song styling
    e.srcElement.style.background = "#FFF0A9";
    e.srcElement.style.color = "black";

}

function clearHighlights(){
    // might not be the most efficient but shhh
    liElements.forEach(function(liElement) {
        liElement.style.backgroundColor = "";
        liElement.style.color = "#1C94C2";
    });
}
  
// Ideally I would refactor this

function nextButton(){

    clearHighlights();

    if (currentSongPos == (Array.from(liElements).length - 1)){
        currentSongPos = 0;
    }
    else{
        currentSongPos = currentSongPos + 1;
    }

    currentSong = liElements[currentSongPos];

    //can't use srcElement so no function for this (yet)
    currentSong.style.background = "#FFF0A9";
    currentSong.style.color = "black";
    title.innerHTML = currentSong.innerHTML;

}

function backButton(){
    clearHighlights();

    if (currentSongPos == (0)){
        currentSongPos = Array.from(liElements).length - 1;
    }
    else{
        currentSongPos = currentSongPos - 1;
    }

    currentSong = liElements[currentSongPos];

    currentSong.style.background = "#FFF0A9";
    currentSong.style.color = "black";
    title.innerHTML = currentSong.innerHTML;

}

document.getElementById("nextbtn").addEventListener('click', nextButton);
document.getElementById("backbtn").addEventListener('click', backButton);

function shuffle(){
    console.log("TODO: ");
    currentSongPos = getRandomArbitrary(0, Array.from(liElements).length - 1);
    currentSong = liElements[currentSongPos];

    clearHighlights();
    currentSong.style.background = "#FFF0A9";
    currentSong.style.color = "black";
    title.innerHTML = currentSong.innerHTML;

}

function getRandomArbitrary(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
  

document.getElementById("shufflebtn").addEventListener('click', shuffle);