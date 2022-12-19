const boxs=document.querySelectorAll('.box');
const statusTxt=document.querySelector('#status');
const btnRestart=document.querySelector('#restart');
const btnPlay=document.querySelector('.play');
let x="<img src='img/X.png' height=70px width=70px>";
let o="<img src='img/O.png' height=70px width=70px>";

const win=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let options=["","","","","","","","",""];
let currentPlayer=x;
let player='X';
let running=false;
init();


function init(){
  btnPlay.classList.add('play');
  boxs.forEach(box=>box.addEventListener('click',boxClick));
  btnRestart.addEventListener('click',restartGame);
  statusTxt.textContent=`${player} Your Turn`;
  statusTxt.classList.add('status')
  running=true;
}

function myPlay() {
    var x = document.getElementById("game");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      btnPlay.classList.remove('play');
      x.style.display = "block";
    }
  }
  
function boxClick(){
  const index=this.dataset.index;
  if(options[index]!="" || !running){
    return;
  }
  updateBox(this,index);
  checkWinner();
}

function updateBox(box,index){
  options[index]=player;
  box.innerHTML=currentPlayer;
}

function changePlayer(){
    player=(player=='X') ? 'O' :'X';
    currentPlayer=(currentPlayer==x) ? o :x;
    statusTxt.textContent=`${player} Your Turn`;
}

function checkWinner(){
  let isWon=false;
  for(let i=0;i<win.length;i++){
    const condition=win[i]; //[0,1,2]
    const box1=options[condition[0]]; //x
    const box2=options[condition[1]]; //''
    const box3=options[condition[2]]; //''
    if(box1=="" || box2=="" || box3==""){
      continue;
    }
    if(box1==box2 && box2==box3){
      isWon=true;
      boxs[condition[0]].classList.add('win');
      boxs[condition[1]].classList.add('win');
      boxs[condition[2]].classList.add('win');
    }
  }

  if(isWon){
    statusTxt.textContent=`${player} Won the Game 🏆..`;
    statusTxt.style.color="#00FF00";
    statusTxt.classList.remove('status');
    // document.querySelector('body').style.backgroundColor="#00FF00"
    running=false;
  }else if(!options.includes("")){
    statusTxt.textContent=`Game Draw🙅..`;
    statusTxt.style.color='#FF0000';
    statusTxt.classList.remove('status');
    btnRestart.classList.add('restart');
    running=false;
  }else{
    changePlayer();
  }

}

function restartGame(){
  options=["","","","","","","","",""];
  currentPlayer=x;
  player="X";
  running=true;
  statusTxt.textContent=`${player} Your Turn`;
  statusTxt.style.color='black';
  document.querySelector('body').style.backgroundColor="white";
  btnRestart.classList.remove('restart')
  boxs.forEach(box=>{
      box.innerHTML="";
      box.classList.remove('win');
  });
}