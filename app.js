let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;
let highscore=0;

let btns=['red','yellow','green','blue'];
let h2=document.querySelector('h2');

document.addEventListener('keypress',function(){
    if(started == false){
        console.log('Game started');
        started=true;
    }

    levelup();
});

function gameFlash(btn){
  btn.classList.add('flash');
  setTimeout(function(){
    btn.classList.remove('flash');
  } , 250);
   
};

function userFlash(btn){
  btn.classList.add('userflash');
  setTimeout(function(){
    btn.classList.remove('userflash');
  } , 250);
   
};

function levelup(){
    userSeq=[]; // Reset for next level;

    level++;
    h2.innerText=`level ${level}`;

    // choose which btn to flash
    let randomIdx=Math.floor(Math.random()*3);
    let randomColor=btns[randomIdx];
    let randomBtn=document.querySelector(`.${randomColor}`);
    // console.log(randomBtn);

    gameSeq.push(randomColor);
    console.log(gameSeq);

    gameFlash(randomBtn);
}

function checkAns(idx){
    // console.log("curr level ", level);
    // let idx=level-1;

    if(gameSeq[idx] === userSeq[idx]){
      if(gameSeq.length === userSeq.length){
        setTimeout(levelup,1000);
      }
    }
    else{
      h2.innerHTML=`Game Over !! Your score was <b>${level}</b> <br> Press any key to start.`;
      highscore=Math.max(highscore,level);

      document.querySelector(".score").innerText=`Highscore :${highscore}`;

      document.querySelector('body').style.backgroundColor='red';
      setTimeout(function(){
         document.querySelector('body').style.backgroundColor='#191B2A'
      },1000);

      reset();
    }
};

function btnPress(){
    console.log(this);
    let btn=this;
    userFlash(btn);

    usercolor=btn.getAttribute("id");
    userSeq.push(usercolor);

    checkAns(userSeq.length-1);
}


let allbtns=document.querySelectorAll(".btn");

for(btn of allbtns){
    btn.addEventListener("click",btnPress)
}


//reset function

function reset(){
  started=false;
  level=0;
  gameSeq=[];
  userSeq=[];
}