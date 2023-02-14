//This is my initial game while following the procedure of the assignments, more improvements will be added later
//and submitted later

const gameContainer = document.getElementById("game");
const obj = JSON.parse(localStorage.getItem("lowest"));
document.querySelector("h2").innerText = `The lowest score is ${obj}`;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];




let MultiColor = []; //array to make different colors

let compare1 = null; //used to compare two different divs
let compare2 = null;

let gameStart = false; //Used for gamestates
let endOfGame = 0;
let points = 0;

let text = document.querySelector("h2");
let textScore = document.createElement("h3");
text.after(textScore);

//Creates a random color of RGB values and appends them twice
function rgbRandomArray(amount){
  for(let i = 0; i<amount/2; i++){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let rgb = `rgb(${r},${g},${b})`
    MultiColor.push(rgb);
    MultiColor.push(rgb);
  }
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
// adjusted to for random colors and user selected cards
function createDivsForColors(colorArray, cards) {
  for (let i = 0; i<cards; i++) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(colorArray[i % colorArray.length]);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}




//Compares two divs to see if they match and checks on the state of the game
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let endOfMatch = MultiColor.length/2;
      if(event.target.style.backgroundColor == "" && event.target != "html"){ //prevents players from clicking the same div
        event.target.style.backgroundColor = event.target.classList[0];
        //stores the two divs

        if(compare1 === null){
          compare1 = event;
        }
        else if(compare2 === null){
          compare2 = event;
        }
      }
  // compares the two divs to see if they match and updates scores
  setTimeout(function(){
    
    if(compare1 != null && compare2 !=null){
      if(compare1.target.classList[0] != compare2.target.classList[0]){
        compare1.target.style.backgroundColor = "";
        compare2.target.style.backgroundColor = "";
        compare1 = null;
        compare2 = null;
        points++;
        const scoreText = document.querySelector("h3");
        scoreText.innerText = `Your current score is ${points}`;
      }
      else{
        compare1 = null;
        compare2 = null;
        points++;
        endOfGame++;
        const scoreText = document.querySelector("h3");
        scoreText.innerText = `Your current score is ${points}`;
      }
    }
    //all divs are filled out and stores the lowest score in local storage
    if(endOfGame == endOfMatch){
      const scoreText = document.querySelector("h3");
      scoreText.innerText = `Congrats your score is ${points}`;
      if(obj == null || points<obj || obj == 0){
        localStorage.setItem("lowest", JSON.stringify(points));
        document.querySelector("h2").innerText = `The lowest score is ${points}`;
      }
      gameStart = false;
    }
  },1000);

}

//event listner that focuses on the buttons of start and reset
//The two button are honestly identical in terms of function.
document.addEventListener("click",function(e){
  let cards = document.querySelector("select").value;
 
  //only clickable from the start and the end of the game
  if(e.target.innerText ==="Begin Game" && gameStart === false){
    compare1 = null;
    compare2 = null;
    MultiColor = [];
    points = 0;
    rgbRandomArray(cards);
    const containers = document.querySelector("div");
    let children = containers.lastElementChild;
    while(children){
      containers.removeChild(children);
      children = containers.lastElementChild;
    }
    shuffledColors = shuffle(MultiColor);
    createDivsForColors(MultiColor, cards);
    gameStart = true;   
    textScore.textContent = "Your current score is 0"
    
  }
  //resets everything without storing anything
  if(e.target.innerText === "Reset Game" && gameStart === true){
    compare1 = null;
    compare2 = null;
    MultiColor = [];
    rgbRandomArray(cards);
    shuffledColors = shuffle(MultiColor);
    const containers = document.querySelector("div");
    let children = containers.lastElementChild;
    while(children){
      containers.removeChild(children);
      children = containers.lastElementChild;
    }
    textScore.textContent = "Your current score is 0"
    points = 0;
    createDivsForColors(shuffledColors, cards);
  }
})

