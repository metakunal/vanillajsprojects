// alert("This is JS");
let x=true; 
let y=true;
let ball=document.querySelector(".ball");
let board=document.querySelector(".board");
let leftPaddle=document.querySelector(".left");
let rightPaddle=document.querySelector(".right");
let boardBounds=board.getBoundingClientRect();
const msound=new Audio('food.mp3');
let leftPlayerLifes=3;
let rightPlayerLifes=3;
//user input listen
document.addEventListener("keydown",function(e){
    console.log("Koi to key hain");
    if(e.key=="w"){
        //decreases inner hieght by 10 percent
movePaddle(leftPaddle,-window.innerHeight*0.1);
    }else if(e.key=="s"){
        movePaddle(leftPaddle,window.innerHeight*0.1);
    }else if(e.key=="ArrowUp"){
        movePaddle(rightPaddle,-window.innerHeight*0.1);
    }else if(e.key=="ArrowDown"){
        movePaddle(rightPaddle,window.innerHeight*0.1);
    }
})
function movePaddle(cpaddle,change){
    let cPaddleBounds=cpaddle.getBoundingClientRect();
    if(cPaddleBounds.top+change>=boardBounds.top&&cPaddleBounds.bottom+change<=boardBounds.bottom)
    {
        cpaddle.style.top=cPaddleBounds.top+change+"px";
    }
    
}
function moveBall(){
    //To get the current left, right, top, bottom of ball
let ballcord=ball.getBoundingClientRect();
let ballTop=ballcord.top;
let ballLeft=ballcord.left;
let ballRight=ballcord.right;
let ballBottom=ballcord.bottom;
//Check if collided with any players horizontal boundary
let hasTouchLeft=ballLeft<boardBounds.left;
let hasTouchRight=ballRight>boardBounds.right;
if(hasTouchLeft||hasTouchRight){
    if(hasTouchLeft){
        leftPlayerLifes--;
        if(leftPlayerLifes==0){
            alert("GAME OVER,🙄🥰 Player B won")
        }
        else{
            return resetGame();
        }
    }
    else{
        rightPlayerLifes--;
        if(rightPlayerLifes==0){
            alert("GAME OVER,😂😁 Player A won")
        }
        else{
            return resetGame();
        }
    }
}
function resetGame(){
    //Send ball to its original position
    ball.style.top=window.innerHeight*0.45+"px";
    ball.style.left=window.innerWidth*0.45+"px";
    requestAnimationFrame(moveBall);
}
//to keep the ball in bound
//handling vertical bound
if(ballTop<=boardBounds.top||ballBottom>=boardBounds.bottom)
{
    //vertically outside
    y=!y;
}
//handling horizontal bound
// if(ballLeft<=boardBounds.left||ballRight>=boardBounds.right)
// {
//     //horizontally outside
//     x=!x;
// }
//Collisions with peddles
let leftPaddleBounds=leftPaddle.getBoundingClientRect();
let rightPaddleBounds=rightPaddle.getBoundingClientRect();
if(ballLeft<=leftPaddleBounds.right&&ballRight>=leftPaddleBounds.left&&ballTop+30>=leftPaddleBounds.top&&ballBottom-30<=leftPaddleBounds.bottom)
{
    x=!x;
   // msound.play();
}

if(ballLeft<=rightPaddleBounds.right&&ballRight>=rightPaddleBounds.left&&ballTop+30>=rightPaddleBounds.top&&ballBottom-30<=rightPaddleBounds.bottom)
{
    x=!x;
   // msound.play();
}
//Notice how to switch case to make the code one liner in statements such as below
// FOR SPEED, change the numbers below
ball.style.top= y==true?ballTop+6+"px":ballTop-6+"px";
ball.style.left= x==true?ballLeft+6+"px":ballLeft-6+"px";
requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);