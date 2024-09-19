let randomPattern = [];
let userPattern = [];
let timeoutCounter = 1000;
let score = 0;

const greenBtn = document.querySelector('.part1');
const redBtn = document.querySelector('.part2');
const yellowBtn = document.querySelector('.part3');
const blueBtn = document.querySelector('.part4');

const startStopBtn = document.querySelector('.start-stop-btn');
const scoreDisplay = document.querySelector('#score');

const part1Sound = new Audio('1.mp3');
const part2Sound = new Audio('2.mp3');
const part3Sound = new Audio('3.mp3');
const part4Sound = new Audio('4.mp3');
const wrongSound = new Audio('wrong.mp3');
const correctSound = new Audio('correct.mp3');

// Helper Functions

let randomNumber = function() { 
    return Math.floor(Math.random() * 4) + 1;
};

function displayGreen(){
    greenBtn.classList.remove('part1Dark');
    greenBtn.classList.add('part1Light');
    part1Sound.play();
    setTimeout(() => {
        greenBtn.classList.remove('part1Light');
        greenBtn.classList.add('part1Dark');
    }, 500);
}

function displayRed(){
    redBtn.classList.remove('part2Dark');
    redBtn.classList.add('part2Light');
    part2Sound.play();
    setTimeout(() => {
        redBtn.classList.remove('part2Light');
        redBtn.classList.add('part2Dark');
    }, 500);
}

function displayYellow() {
    yellowBtn.classList.remove('part3Dark');
    yellowBtn.classList.add('part3Light');
    part3Sound.play();
    setTimeout(() => {
        yellowBtn.classList.remove('part3Light');
        yellowBtn.classList.add('part3Dark');
    }, 500);
}

function displayBlue() {
    blueBtn.classList.remove('part4Dark');
    blueBtn.classList.add('part4Light');
    part4Sound.play();
    setTimeout(() => {
        blueBtn.classList.remove('part4Light');
        blueBtn.classList.add('part4Dark');
    }, 500);
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

function generateItem() {
    let number = randomNumber();
    randomPattern.push(number);

    if (number === 1){
        displayGreen();
    } else if (number === 2){
        displayRed();
    } else if (number === 3){
        displayYellow();
    } else if (number === 4){
        displayBlue();
    };
    console.log(`The random number is ${number}`);
}

function displayPattern() {
    if (randomPattern.length === userPattern.length) {
        if (arraysAreEqual(randomPattern, userPattern)) {
            
            // Play the correct sound and add a delay before starting the pattern display
            correctSound.play();
            setTimeout(() => {
                // If patterns match, display the pattern again
                for (let i = 0; i < randomPattern.length; i++) {
                    if (randomPattern[i] === 1) {
                        setTimeout(() => displayGreen(), i * 1000);
                    } else if (randomPattern[i] === 2) {
                        setTimeout(() => displayRed(), i * 1000);
                    } else if (randomPattern[i] === 3) {
                        setTimeout(() => displayYellow(), i * 1000);
                    } else if (randomPattern[i] === 4) {
                        setTimeout(() => displayBlue(), i * 1000);
                    }
                }

                // Proceed to generate a new item after the pattern display
                setTimeout(() => generateItem(), randomPattern.length * 1000);
                userPattern = [];
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            }, 1000); // 1000 ms delay before displaying the pattern
            
        } else {
            // If patterns don't match, play the wrong sound and reset the game
            wrongSound.play();
            console.log('Patterns did not match, restarting game');
            randomPattern = [];
            userPattern = [];
            setTimeout(() => generateItem(), 1000); // Adding a delay before resetting
            score = 0;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    }
}


// Start Button Click Handler
startStopBtn.addEventListener('click', () => {
    startStopBtn.classList.remove('start-stop-btn');
    startStopBtn.classList.add('hide');
    scoreDisplay.classList.remove('hide');
    scoreDisplay.classList.add('score');
    
    let colorTimeoutHandle;
    generateItem();

    greenBtn.addEventListener('click', () => {
        if (colorTimeoutHandle) clearTimeout(colorTimeoutHandle);
        userPattern.push(1);
        displayGreen();
        colorTimeoutHandle = setTimeout(() => displayPattern(), 2000);
    });

    redBtn.addEventListener('click', () => {
        if (colorTimeoutHandle) clearTimeout(colorTimeoutHandle);
        userPattern.push(2);
        displayRed();
        colorTimeoutHandle = setTimeout(() => displayPattern(), 2000);
    });

    yellowBtn.addEventListener('click', () => {
        if (colorTimeoutHandle) clearTimeout(colorTimeoutHandle);
        userPattern.push(3);
        displayYellow();
        colorTimeoutHandle = setTimeout(() => displayPattern(), 2000);
    });

    blueBtn.addEventListener('click', () => {
        if (colorTimeoutHandle) clearTimeout(colorTimeoutHandle);
        userPattern.push(4);
        displayBlue();
        colorTimeoutHandle = setTimeout(() => displayPattern(), 2000);
    });
});
