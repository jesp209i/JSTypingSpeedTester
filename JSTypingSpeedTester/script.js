const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const mistakesField = document.querySelector("#mistakes");
const wpmField = document.querySelector("#wpm");
const selectorField = document.querySelector("#text-selector");

const newTexts = ["The text to test.", "More text to test on.", "What a time to live"];

var originText = document.querySelector("#origin-text p").innerHTML;

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var mistakeCounter = 0;


// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
    
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);
    let words = textEntered.split(' ').length;
    let wordsPrMinute = 0;
    if (timer[1] > 0) {
        wordsPrMinute = (words / timer[1]) * 60;
    }
    wpmField.innerHTML = wordsPrMinute;
    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
        console.log("you won. Your time is: " + theTimer.innerHTML);
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCF3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
            mistakeCounter++;
            mistakesField.innerHTML = mistakeCounter;
        }
    }
}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        console.log("started");
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log("still running");


}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    mistakeCounter = 0;
    mistakesField.innerHTML = 0;
    wpmField.innerHTML = 0;
    console.log("reset was pressed");
}

function changeText() {
    var selectedTextIndex = selectorField.selectedIndex;
    originText = newTexts[selectedTextIndex];
    console.log("text was changed to " + newTexts[selectedTextIndex]);
}

(function populateSelect() {
    let newTextsCount = newTexts.length;
    for (var i = 0; i < newTextsCount; i++) {
        var option = document.createElement("option");
        option.text = newTexts[i];
        selectorField.add(option)
    }
}());

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
selectorField.addEventListener("change", changeText, false);