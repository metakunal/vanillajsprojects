// Game Constant and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/bgmh.mp3');
let speed = 10;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    { x: 13, y: 15 }

]
//food is not an array it is just an element
food = { x: 6, y: 7 };
// Game Functions, ctime-current itme
function main(ctime) {
    window.requestAnimationFrame(main);
    //Controlling fps, dividing by 1000 as millisecond, 1/speed=0.5, itne seconds ke baad ham render karna chahte hain
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();


}
function isCollide(snake) {
    //Ya to deewar se takra jaoon, ya snake khud mein ghus jaye
    //If the snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    //Part1 : Updating the snake array and food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over press any to paly again!");
        //Restarting the Game
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }
    //If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hi-score : " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });//Snake ki mundi ke aage jis direction mein wo move kar raha hain, ek aur element laga denge
        let a = 2;
        let b = 16;
        //Generating random number beteen 2 and 16
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }
    //Moving the snake, we just need to place the element at the place of the next element
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };//giving the value of i+1 to i
    }
    //Special code for restructuring the last element
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    //Part2: Display the snake
    //First we need to empty the board before displaying the snake every time
    board.innerHTML = " ";
    snakeArr.forEach((e, index) => {
        //Creating a div element
        snakeElement = document.createElement('div');
        //Styling the element
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        //Adding head css when it is the first element
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            //Else Adding the snake css to snake
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Part3: Display the snake

    //Creating a div element
    foodElement = document.createElement('div');
    //Styling the element
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    //Adding the food css to food
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}
// Main Logic Starts Here
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hiscore : " + hiscoreval;
}
window.requestAnimationFrame(main);
//Creating a event to listen whenever a key is pressed on keyboard
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }//Start the game, towards x=0 and y=1
    moveSound.play();//Playing the Sound
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            //Input dir mein x ya y mein se ek ko zero rehna hi padega as snake ya to x ke along move karta hain ya y ke along
            inputDir.x = 0;
            inputDir.y = -1;//as isme y neeche to increase hoti hain, to snake to upar badhane ke liye hamein y ko 1 se ghatana padega
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }

});

