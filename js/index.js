let inputDir={x: 0,y: 0};
const foodSound=new Audio('./music/food.mp3');
const gameOverSound=new Audio('./music/gameover.mp3');
const moveSound=new Audio('./music/move.mp3');
const musicSound=new Audio('./music/music.mp3');
let speed=10;
let score=0
let LastPaintTime=0;
let snakeArr=[{x:13,y:15}]
let food={x:6,y: 7};
//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-LastPaintTime)/1000<1/speed)return;
    LastPaintTime=ctime;
    gameEngine();
}
function isCollide(sarr){
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x===snakeArr[0].x&&snakeArr[i].y===snakeArr[0].y)return true;
    }
    if(snakeArr[0].x>=18||snakeArr[0].x<=0||snakeArr[0].y>=18||snakeArr[0].y<=0)return true;
    return false;
}
function gameEngine(){
    //updating Snake Array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over-Press OK key to restart");
        snakeArr=[{x:13,y:15}]
        musicSound.play();
        score=0;
    }
    //if you have eaten the food then regenerate the food
    if(snakeArr[0].x===food.x&&snakeArr[0].y===food.y){
        foodSound.play();
        score+=1;
        scoreBox.innerHTML="SCORE: "+score;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="HIGH SCORE: "+hiscoreval;
        }
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x,y: snakeArr[0].y+inputDir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
   snakeArr[0].x+=inputDir.x;
   snakeArr[0].y+=inputDir.y;
    //displaying snake arr and food
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0)
        snakeElement.classList.add('head');
        else         snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main Logic
musicSound.play();
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));}
    else {
        hiscoreval=JSON.parse(hiscore);
        hiscoreBox.innerHTML="HIGH SCORE: "+hiscoreval;
    }
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
            case "ArrowDown":
                inputDir.x=0;
                inputDir.y=1;
                break;
                case "ArrowLeft":
                    inputDir.x=-1;
                    inputDir.y=0;
                    break;
                    case "ArrowRight":
                        inputDir.x=1;
                        inputDir.y=0;
                        break;
            default:
            break;
    }
})