var selected;
var openCells = [];
var activePlayer = 0;
var score = [0,0]; 
var timeTracker = [0,0];
var activeAction = "select";

function isEven(n) {
  n = Number(n);
  return n === 0 || !!(n && !(n%2));
}

function Position(){
  this.x = 0;
  this.y = 0;
}

class Man {
  constructor(n, pos ) {
    this.id = n;
    this.position = new Position();
    this.position.x = pos.x;
    this.position.y = pos.y;
  }
}

function findIndex2D (array, element){
  let iMax = array.length;
  let jMax = array[0].length;

  for (let i = 0; i < iMax; i++) {
    for (let j = 0; j < jMax; j++) {

      if(board[j][i] === element){
        let pos = new Position();
        pos.x = j;
        pos.y = i;
        return pos;
      }
      
    }
  }
}

var board = [];
for (let i = 0; i < 8; i++) {
  board[i] = [];
}


for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    board[j][i] = document.getElementsByClassName('man')[j+(i*8)];
  }
}

var redMen = [];

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 4; j++) {
    let startX = 0;
    let startY = i;

    if (isEven(i+1)){
      startX = (j*2);
    }

    if (!isEven(i+1)){
      startX = (j*2)+1;
    }

    // setTimeout(() => {
      board[startX][startY].classList.remove("empty");
      board[startX][startY].classList.add("red");
      redMen.push(new Man(redMen.length, { x:startX, y:startY }));
      board[startX][startY].setAttribute("id", "red-"+redMen[redMen.length-1].id );
    // }, 200*(j+(i*4)));
    
    
  }
}


var whiteMen = [];

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 4; j++) {
    let startX = 0;
    let startY = i+5;

    if (!isEven(i+1)){
      startX = (j*2);
    }

    if (isEven(i+1)){
      startX = (j*2)+1;
    }
    // setTimeout(() => {
      board[startX][startY].classList.remove("empty");
      board[startX][startY].classList.add("white");
      whiteMen.push(new Man(whiteMen.length, {x:startX, y:startY}));
      board[startX][startY].setAttribute("id", "white-"+whiteMen[whiteMen.length-1].id );
    // }, 2600+ 200*(j+(i*4)));
    
  }
}



console.log(redMen)
console.log(board)

function checkIfMovable(selectedMan){

  selectedMan.pos = findIndex2D(board,selectedMan);

  let x = selectedMan.pos.x;
  let y = selectedMan.pos.y;

  //top-left
  if( selectedMan.classList.contains("white") || ( selectedMan.classList.contains("king") ))
    if ( x > 0 && y > 0){

      if ( board[x-1][y-1].classList.contains("empty") && activeAction!=="eating"){
        openCells.push(board[x-1][y-1]);
        openCells[openCells.length-1].hasEnemy = false;
      }else if(board[x-1][y-1].classList.contains(selected.enemy) && x > 1 && y >1 && board[x-2][y-2].classList.contains("empty")){
        // activeAction = "eating";
        openCells.push(board[x-2][y-2]);
        openCells[openCells.length-1].hasEnemy = true;
        openCells[openCells.length-1].fallenEnemy = board[x-1][y-1];
      }

    }

   //top-right
  if( selectedMan.classList.contains("white") || ( selectedMan.classList.contains("king") ))
   if ( x < 7 && y > 0){

    if ( board[x+1][y-1].classList.contains("empty") && activeAction!=="eating"){
      openCells.push(board[x+1][y-1]);
      openCells[openCells.length-1].hasEnemy = false;
    }else if(board[x+1][y-1].classList.contains(selected.enemy) && x < 6 && y >1 && board[x+2][y-2].classList.contains("empty")){
      // activeAction = "eating";
      openCells.push(board[x+2][y-2]);
      openCells[openCells.length-1].hasEnemy = true;
      openCells[openCells.length-1].fallenEnemy = board[x+1][y-1];
    }
  }

  //bottom-right
  if( selectedMan.classList.contains("red") || ( selectedMan.classList.contains("king") ))
  if ( x < 7 && y < 7 ){

    if ( board[x+1][y+1].classList.contains("empty") && activeAction!=="eating"){
      openCells.push(board[x+1][y+1]);
      openCells[openCells.length-1].hasEnemy = false;
    }else if(board[x+1][y+1].classList.contains(selected.enemy) && x < 6 && y < 6 && board[x+2][y+2].classList.contains("empty")){
      // activeAction = "eating";
      openCells.push(board[x+2][y+2]);
      openCells[openCells.length-1].hasEnemy = true;
      openCells[openCells.length-1].fallenEnemy = board[x+1][y+1];
    }

  }

   //bottom-left
  if( selectedMan.classList.contains("red") || ( selectedMan.classList.contains("king") ))
  if ( x > 0 && y < 7){

    if ( board[x-1][y+1].classList.contains("empty") && activeAction!=="eating"){
      openCells.push(board[x-1][y+1]);
      openCells[openCells.length-1].hasEnemy = false;
    }else if(board[x-1][y+1].classList.contains(selected.enemy) && x > 1 && y < 6 && board[x-2][y+2].classList.contains("empty")){
      // activeAction = "eating";
      openCells.push(board[x-2][y+2]);
      openCells[openCells.length-1].hasEnemy = true;
      openCells[openCells.length-1].fallenEnemy = board[x-1][y+1];
    }

  }

  for (let i = 0; i < openCells.length; i++) {
    openCells[i].classList.add("movable");
  }

  return openCells.length;

}

function select(target){

  if(target.parentElement.classList.contains("man")){
    target = target.parentElement;
  }


  if(activePlayer === 0){
    target.enemy = "white";
    if(!target.classList.contains('red')){
      console.log(target);
      return console.log("Select a RED man!")
    }
  }else{
    target.enemy="red";
    if(!target.classList.contains('white')){
      console.log(target);
      return console.log("Select a WHITE man!")
    }
  }
  selected = target;

  if(activeAction !== "eating"){
    activeAction = "move";
  }
  console.log(activeAction);

  checkIfMovable(selected);

}

function checkCoronation(target){

  let coronationY = 0;

  if(activePlayer === 0){
    coronationY = 7;
  }else{
    coronationY = 0;
  }

  target.pos = findIndex2D(board, target);
  if(target.pos.y === coronationY){
    target.classList.add("king");
  }
  console.log("Coronation X:" + target.pos.x + "  Y:" +target.pos.y);

}

function changePlayer(){
  document.getElementById("player-"+(activePlayer+1)).classList.remove("active");  

  shadowDir = "";

  if(activePlayer === 0){
    activePlayer = 1;
    document.getElementById("main").style.transform = "rotateZ(0deg) perspective(30em) rotateX(30deg)";
    shadowDir = "-";
  }else{
    activePlayer = 0;
    document.getElementById("main").style.transform = "rotateZ(180deg) perspective(30em) rotateX(-30deg)";
    shadowDir = "+";
  }

  document.getElementById("player-"+(activePlayer+1)).classList.add("active");

  arrangeShadows();
    // child[0].style.cssText= "";
  }

  function arrangeShadows(){
    let redMen = document.getElementsByClassName('red');
    for (let i = 0; i < redMen.length; i++) {
      redMen[i].style.cssText = "box-shadow: inset rgb(138, 70, 46) 0px "+shadowDir+"1vh;";
      let child = redMen[i].children;
      child[0].style.cssText = "top:"+(shadowDir)+"15%; box-shadow: inset rgb(138, 70, 46) 0px "+shadowDir+"1vh;";
    }
  
    let whiteMen = document.getElementsByClassName('white');
    for (let i = 0; i < whiteMen.length; i++) {
      whiteMen[i].style.cssText= "box-shadow: inset rgb(122, 122, 122) 0px "+shadowDir+"1vh;";
      let child = whiteMen[i].children;
      child[0].style.cssText= "top:"+(shadowDir)+"15%; box-shadow: inset rgb(122, 122, 122) 0px "+shadowDir+"1vh;";
  }

}


function cleanMovableCells(){
  for (let i = 0; i < openCells.length; i++) {
    openCells[i].classList.remove("movable");
  }

  openCells = [];

  let emptyMen = document.getElementsByClassName('empty');
  for (let i = 0; i < emptyMen.length; i++) {
    let child = emptyMen[i].children;
    child[0].style.cssText= "box-shadow:";
    emptyMen[i].style.cssText= "box-shadow:";
  }
}


function move(target) {

  target.pos =  findIndex2D(board,target);
  let x = target.pos.x;
  let y = target.pos.y;


  
  if(target.classList.contains("movable") ){
      let baseId;

      if(activePlayer === 0){
        baseId = 'red-';
        baseClass = 'red';

      }else{
        baseId = "white-";
        baseClass = 'white';
      }
      

      target.setAttribute('id', selected.id);
      target.classList.add(baseClass);
      target.classList.remove("empty");

      selected.classList.add("empty");
      selected.removeAttribute('id');
      selected.classList.remove(baseClass);

      if(selected.classList.contains("king")){
        target.classList.add("king");
        selected.classList.remove("king");
      }

      cleanMovableCells();
      checkCoronation(target);

      if(board[x][y].hasEnemy){
        console.log("EATING!");

        checkWin();

        board[x][y].fallenEnemy.classList.remove(selected.enemy);
        board[x][y].fallenEnemy.removeAttribute("id");
        board[x][y].fallenEnemy.classList.add("empty");
        score[activePlayer]++;
        document.getElementById("player-"+(activePlayer+1)+"-score").innerText = score[activePlayer];
        
        cleanMovableCells();

        activeAction="eating";
        
        let plusMoves = checkIfMovable(target);

          if(plusMoves > 0 ){
            arrangeShadows();
            console.log("Can eat more: " + plusMoves );
            select(target);
            // activeAction="move";
            
          }else{
            console.log("Can't eat anymore: " + plusMoves );
            activeAction = "select";
            changePlayer();
          }
        
      }else{
        activeAction = "select";
        changePlayer();
      }
      // cleanMovableCells();
      // board[newpos.x][newpos.y].innerText = "X";

      console.log(board);
      
  }else{
    activeAction = "select";
    cleanMovableCells();
  }    
}


document.addEventListener('click', function(e) {
  e = e || window.event;
  let target = e.target || e.srcElement,
      text = target.textContent || target.innerText;   
      
      if(activeAction === "move" || activeAction === "eating"){
        move(target);
      }

      if(activeAction === "select"){
        select(target);
      }

      

}, false);

setInterval(() => {
  timer();
}, 1000);

function timer(){
  timeTracker[activePlayer]++;
  // console.log(timeTracker[activePlayer]);
  
  let currentPlayerTimerDOM = document.getElementById("player-"+(activePlayer+1)).getElementsByClassName("time");
  currentPlayerTimerDOM[0].innerHTML = secsToMinSecs(timeTracker[activePlayer]);
}

function secsToMinSecs(secs) {
  var min = Math.floor(secs / 60);
  var secs = (secs % 60).toFixed(0);
  
  
  return min + ":" + (secs < 10 ? '0' : '') + secs;
}


// NOT WORKING
function checkWin(){
  if(score[activePlayer] >= 12) {
    console.log("Player "+(activePlayer+1)+"Wins!!!");
  }
}