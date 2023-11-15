'use strict';

const RED = "bar-red";
const BLUE = "bar-blue";
const GREEN = "bar-green";

const NOTE_DURATION = 50;
const FREQ_MIN = 200;
const FREQ_MAX = 500;
const VOLUME = 0.003;
const MAX_SPEED = 5;
const MIN_SPEED = 500;
const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
let soundEnabled = true;

const randomizeArrayButton = document.getElementById("randomize-array-button");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const buttonContainer = document.querySelector('.button-container');
stopButton.disabled = true;
// const soundToggle = document.getElementById("sound-toggle");
const leftAlgo = document.getElementById("leftAlgo");
const rightAlgo = document.getElementById("rightAlgo");

let barContainerLeft = document.getElementById("left");
let barContainerRight = document.getElementById("right");
let speed = document.getElementById("speed");
let sampleSize = document.getElementById("size");

let minRange = 1;
let maxRange = sampleSize.value;
let numOfBars = sampleSize.value;
let heightFactor = 100/numOfBars;

let barsLeft = [], barsRight = [];
let running = false;
let runningLeft = false, runningRight = false;

let speedFactor = (parseInt(sampleSize.value))/100*(MAX_SPEED-MIN_SPEED)+MIN_SPEED;
let unsorted_array = new Array(numOfBars);

sampleSize.addEventListener("input", (event) => {
    // running = false;
    runningLeft = false;
    runningRight = false;
    stopButton.click();
    numOfBars = event.target.value;
    heightFactor = 100/numOfBars;
    maxRange = numOfBars;
    barContainerLeft.innerHTML = "";
    barContainerRight.innerHTML = "";
    unsorted_array = createRandomArray(false);
    renderBars(unsorted_array);
});

speed.addEventListener("input", (event) => {
    if (!event.target.value) return;
    speedFactor = (parseInt(event.target.value))/100*(MAX_SPEED-MIN_SPEED)+MIN_SPEED;
});

// soundToggle.addEventListener('click', () => {
//     let soundValue = soundToggle.dataset.value;
//     if (soundValue === "1") {
//         soundValue = "0";
//         let dynamicText = soundToggle.querySelector('.dynamic-text');
//         dynamicText.animate({
//             opacity: 0,
//         }, { duration: 500, fill: "forwards" }).onfinish = () => {
//             dynamicText.style.color = 'red';
//             dynamicText.textContent = "Off!";
//             dynamicText.animate({
//                 opacity: 1,
//             }, { duration: 500, fill: "forwards" });
//         };
//     }
//     else {
//         soundValue = "1";
//         let dynamicText = soundToggle.querySelector('.dynamic-text');
//         dynamicText.animate({
//             opacity: 0,
//         }, { duration: 500, fill: "forwards" }).onfinish = () => {
//             dynamicText.style.color = 'green';
//             dynamicText.textContent = "On!";
//             dynamicText.animate({
//                 opacity: 1,
//             }, { duration: 500, fill: "forwards" });
//         };
//     }
//     soundToggle.dataset.value = soundValue;
//     soundEnabled = (soundValue === "1") ? true : false;
// });

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray(shuffle = true) {
    let array = new Array(numOfBars);
    for (let i = 0; i < numOfBars; i++) {
        array[i] = i + 1;
    }
    if (!shuffle) return array;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
    unsorted_array = createRandomArray(false);
    renderBars(unsorted_array);
});

function renderBars(array) {
  barsLeft = [];
  barsRight = [];
  for (let i = 0; i < numOfBars; i++) {
    let barLeft = document.createElement("div");
    let barRight = document.createElement("div");
    barLeft.classList.add("bar");
    barRight.classList.add("bar");

    barContainerLeft.appendChild(barLeft);
    barContainerRight.appendChild(barRight);

    barLeft.style.left = `${i*heightFactor}%`;
    barLeft.style.width = `${heightFactor}%`;

    barRight.style.left = `${i*heightFactor}%`;
    barRight.style.width = `${heightFactor}%`;

    barLeft.animate([
        {
            height: '0%',
        },
        {
            height: `${array[i]*heightFactor}%`,
        }
    ], { duration: 700, fill: "none", easing: "ease-in-out"});

    barRight.animate([
        {
            height: '0%',
        },
        {
            height: `${array[i]*heightFactor}%`,
        }
    ], { duration: 700, fill: "none", easing: "ease-in-out"});

    barLeft.style.height = `${array[i]*heightFactor}%`;
    barRight.style.height = `${array[i]*heightFactor}%`;

    barsLeft.push(barLeft);
    barsRight.push(barRight);
  }
}

randomizeArrayButton.addEventListener("click", async function () {
    for (let i = 0; i < barsLeft.length; i++) {
        barsLeft[i].animate([
            {
                height: barsLeft[i].style.height,
            },
            {
                height: '0%',
            }
        ], { duration: 700, fill: "none", easing: "ease-in-out"});
        barsLeft[i].style.height = '0%';

        barsRight[i].animate([
            {
                height: barsRight[i].style.height,
            },
            {
                height: '0%',
            }
        ], { duration: 700, fill: "none", easing: "ease-in-out"});
        barsRight[i].style.height = '0%';
    }
    await sleep(700);
    unsorted_array = createRandomArray();

    barContainerLeft.innerHTML = "";
    barContainerRight.innerHTML = "";

    renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function changeColorLeft(i, color) {
    barsLeft[i].classList.add(color);
}

function changeColorRight(i, color) {
    barsRight[i].classList.add(color);
}

function resetColorLeft(i) {
    barsLeft[i].classList.remove(RED);
    barsLeft[i].classList.remove(BLUE);
    barsLeft[i].classList.remove(GREEN);
}

function resetColorRight(i) {
    barsRight[i].classList.remove(RED);
    barsRight[i].classList.remove(BLUE);
    barsRight[i].classList.remove(GREEN);
}

function compareLeft(x, y) {
    return getValueLeft(x) >= getValueLeft(y);
}

function compareRight(x, y) {
    return getValueRight(x) >= getValueRight(y);
}

function playNote(frequency, duration) {
    const oscillator = new OscillatorNode(audioCtx);
    const gainNode = new GainNode(audioCtx);
    oscillator.type = "square";
    oscillator.frequency.value = frequency; // value in hertz
    gainNode.gain.value = VOLUME;
    oscillator.connect(gainNode).connect(audioCtx.destination);
    oscillator.start();

    setTimeout(function() {
        oscillator.stop();
    }, duration);
}

function getValueLeft(i) {
    return typeof i === "object" ? parseFloat(i.style.height.slice(0, -1)) : parseFloat(barsLeft[i].style.height.slice(0, -1));
}

function getValueRight(i) {
    return typeof i === "object" ? parseFloat(i.style.height.slice(0, -1)) : parseFloat(barsRight[i].style.height.slice(0, -1));
}

async function swapLeft(i, j) {
    // let freq = Math.floor(( (getValueLeft(i) + getValueLeft(j)) / 200) * (FREQ_MAX - FREQ_MIN) + FREQ_MIN);
    // if (soundEnabled) playNote(freq, NOTE_DURATION);
    if (!runningLeft) return;
    changeColorLeft(i, RED);
    [barsLeft[i].style.left, barsLeft[j].style.left] = [barsLeft[j].style.left, barsLeft[i].style.left];
    // [unsorted_array[i], unsorted_array[j]] = [unsorted_array[j], unsorted_array[i]];
    [barsLeft[i], barsLeft[j]] = [barsLeft[j], barsLeft[i]];
    await sleep(speedFactor);
    resetColorLeft(j);
}

async function swapRight(i, j) {
    // let freq = Math.floor(( (getValueRight(i) + getValueRight(j)) / 200) * (FREQ_MAX - FREQ_MIN) + FREQ_MIN);
    // if (soundEnabled) playNote(freq, NOTE_DURATION);
    if (!runningRight) return;
    changeColorRight(i, RED);
    [barsRight[i].style.left, barsRight[j].style.left] = [barsRight[j].style.left, barsRight[i].style.left];
    // [unsorted_array[i], unsorted_array[j]] = [unsorted_array[j], unsorted_array[i]];
    [barsRight[i], barsRight[j]] = [barsRight[j], barsRight[i]];
    await sleep(speedFactor);
    resetColorRight(j);
}

async function batChestLeft() {
    if (!isSortedLeft() || !runningLeft) return;
    for (let i = 0; i < numOfBars; i++) {
        if (!runningLeft) {
            for (let j = 0; j < numOfBars; j++) resetColorLeft(j);
            return;
        }
        // let freq = Math.floor((unsorted_array[i] * heightFactor / 100) * (FREQ_MAX - FREQ_MIN) + FREQ_MIN);
        changeColorLeft(i, GREEN);
        // if (soundEnabled) playNote(freq, NOTE_DURATION);
        await sleep(1000/numOfBars);
    }
    for (let i = 0; i < numOfBars; i++) {
        resetColorLeft(i);
    }
    // for (const button of allButtons)
    //     button.disabled = false;
    runningLeft = false;
    stopButton.click();
}

async function batChestRight() {
    if (!isSortedRight() || !runningRight) return;
    for (let i = 0; i < numOfBars; i++) {
        if (!runningRight) {
            for (let j = 0; j < numOfBars; j++) resetColorRight(j);
            return;
        }
        // let freq = Math.floor((unsorted_array[i] * heightFactor / 100) * (FREQ_MAX - FREQ_MIN) + FREQ_MIN);
        changeColorRight(i, GREEN);
        // if (soundEnabled) playNote(freq, NOTE_DURATION);
        await sleep(1000/numOfBars);
    }
    for (let i = 0; i < numOfBars; i++) {
        resetColorRight(i);
    }
    // for (const button of allButtons)
    //     button.disabled = false;
    runningRight = false;
    stopButton.click();
}

function isSortedLeft() {
    for (let i = 1; i < barsLeft.length; i++) {
        if (!compareLeft(i, i-1)) return false;
    }
    return true;
}

function isSortedRight() {
    for (let i = 1; i < barsRight.length; i++) {
        if (!compareRight(i, i-1)) return false;
    }
    return true;
}

function calculateFreq(i) {
    return getValueLeft(i) / 100 * (FREQ_MAX - FREQ_MIN) + FREQ_MIN;
}

stopButton.addEventListener('click', () => {
    stopButton.disabled = true;
    randomizeArrayButton.disabled = false;
    startButton.disabled = false;
});

startButton.addEventListener('click', () => {
    runningLeft = true;
    runningRight = true;
    stopButton.disabled = false;
    startButton.disabled = true; 
    randomizeArrayButton.disabled = true;
});

startButton.addEventListener("click", async function () {
    switch (leftAlgo.value) {
        case "bubble":
            // await bubbleSortLeft(barsLeft);
            bubbleSortLeft(barsLeft).then(() => {batChestLeft();});
            break;
        case "insertion":
            insertionSortLeft(barsLeft).then(() => {batChestLeft();});
            break;
        case "selection":
            selectionSortLeft(barsLeft).then(() => {batChestLeft();});
            break;
        case "quick":
            quickSortLeft(0, barsLeft.length-1).then(() => {batChestLeft();});
            break;
        case "heap":
            heapSortLeft(barsLeft).then(() => {batChestLeft();});
            break;
        case "merge":
            mergeSortLeft(barsLeft, 0, barsLeft.length).then(() => {batChestLeft();});
            break;
        case "radix":
            radixBucketSortLeft(barsLeft).then(() => {batChestLeft();});
            break;
    } 
    switch (rightAlgo.value) {
        case "bubble":
            bubbleSortRight(barsRight).then(() => {batChestRight();});
            break;
        case "insertion":
            insertionSortRight(barsRight).then(() => {batChestRight();});
            break;
        case "selection":
            selectionSortRight(barsRight).then(() => {batChestRight();});
            break;
        case "quick":
            quickSortRight(0, barsRight.length-1).then(() => {batChestRight();});
            break;
        case "heap":
            heapSortRight(barsRight).then(() => {batChestRight();});
            break;
        case "merge":
            mergeSortRight(barsRight, 0, barsRight.length).then(() => {batChestRight();});
            break;
        case "radix":
            radixBucketSortRight(barsRight).then(() => {batChestRight();});
            break;
    } 
    // batChest();
});

const homeButtons = document.getElementsByClassName("go-home");
for (const homeButton of homeButtons) {
    homeButton.addEventListener("click", () => {
        document.querySelector('#main-page').classList.remove('in');
        document.querySelector("#main-page").classList.add("out");
        setTimeout(() => {window.location.href = '../index.html';}, 500);
    });  
}