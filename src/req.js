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
const soundToggle = document.getElementById("sound-toggle");

let barsContainer = document.getElementById("sort-container");
let speed = document.getElementById("speed");
let sampleSize = document.getElementById("size");

let minRange = 1;
let maxRange = sampleSize.value;
let numOfBars = sampleSize.value;
let heightFactor = 100/numOfBars;

let bars = [];
let running = false;

let speedFactor = (parseInt(sampleSize.value))/100*(MAX_SPEED-MIN_SPEED)+MIN_SPEED;
let unsorted_array = new Array(numOfBars);


sampleSize.addEventListener("input", (event) => {
    running = false;
    stopButton.click();
    numOfBars = event.target.value;
    heightFactor = 100/numOfBars;
    maxRange = numOfBars;
    barsContainer.innerHTML = "";
    unsorted_array = createRandomArray(false);
    renderBars(unsorted_array);
});

speed.addEventListener("input", (event) => {
    if (!event.target.value) return;
    speedFactor = (parseInt(event.target.value))/100*(MAX_SPEED-MIN_SPEED)+MIN_SPEED;
});

soundToggle.addEventListener('click', () => {
    let soundValue = soundToggle.dataset.value;
    if (soundValue === "1") {
        soundValue = "0";
        let dynamicText = soundToggle.querySelector('.dynamic-text');
        dynamicText.animate({
            opacity: 0,
        }, { duration: 500, fill: "forwards" }).onfinish = () => {
            dynamicText.style.color = 'red';
            dynamicText.textContent = "Off!";
            dynamicText.animate({
                opacity: 1,
            }, { duration: 500, fill: "forwards" });
        };
    }
    else {
        soundValue = "1";
        let dynamicText = soundToggle.querySelector('.dynamic-text');
        dynamicText.animate({
            opacity: 0,
        }, { duration: 500, fill: "forwards" }).onfinish = () => {
            dynamicText.style.color = 'green';
            dynamicText.textContent = "On!";
            dynamicText.animate({
                opacity: 1,
            }, { duration: 500, fill: "forwards" });
        };
    }
    soundToggle.dataset.value = soundValue;
    soundEnabled = (soundValue === "1") ? true : false;
});

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
  bars = [];
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    barsContainer.appendChild(bar);

    bar.style.left = `${i*heightFactor}%`;
    bar.style.width = `${heightFactor}%`;

    bar.animate([
        {
            height: '0%',
        },
        {
            height: `${array[i]*heightFactor}%`,
        }
    ], { duration: 700, fill: "none", easing: "ease-in-out"});

    bar.style.height = `${array[i]*heightFactor}%`;

    bars.push(bar);
  }
}

randomizeArrayButton.addEventListener("click", async function () {
    for (let i = 0; i < bars.length; i++) {
        bars[i].animate([
            {
                height: `${unsorted_array[i]*heightFactor}%`,
            },
            {
                height: '0%',
            }
        ], { duration: 700, fill: "none", easing: "ease-in-out"});
        bars[i].style.height = '0%';
    }
    await sleep(700);
    unsorted_array = createRandomArray();
    barsContainer.innerHTML = "";
    renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function changeColor(i, color) {
    bars[i].classList.add(color);
}

function resetColor(i) {
    bars[i].classList.remove(RED);
    bars[i].classList.remove(BLUE);
    bars[i].classList.remove(GREEN);
}

function compare(x, y) {
    return getValue(x) >= getValue(y);
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

async function swap(i, j) {
    let freq = Math.floor(( (unsorted_array[i] + unsorted_array[j]) * heightFactor / 200) * (FREQ_MAX - FREQ_MIN) + FREQ_MIN);
    if (soundEnabled) playNote(freq, NOTE_DURATION);
    if (!running) return;
    changeColor(i, RED);
    [bars[i].style.left, bars[j].style.left] = [bars[j].style.left, bars[i].style.left];
    [unsorted_array[i], unsorted_array[j]] = [unsorted_array[j], unsorted_array[i]];
    [bars[i], bars[j]] = [bars[j], bars[i]];
    await sleep(speedFactor);
    resetColor(j);
}

async function batChest() {
    if (!isSorted() || !running) return;
    for (let i = 0; i < numOfBars; i++) {
        if (!running) {
            for (let j = 0; j < numOfBars; j++) resetColor(j);
            return;
        }
        let freq = Math.floor((unsorted_array[i] * heightFactor / 100) * (FREQ_MAX - FREQ_MIN) + FREQ_MIN);
        changeColor(i, GREEN);
        if (soundEnabled) playNote(freq, NOTE_DURATION);
        await sleep(1000/numOfBars);
    }
    for (let i = 0; i < numOfBars; i++) {
        resetColor(i);
    }
    // for (const button of allButtons)
    //     button.disabled = false;
    running = false;
    stopButton.click();
}

function isSorted() {
    for (let i = 1; i < bars.length; i++) {
        if (!compare(i, i-1)) return false;
    }
    return true;
}

function getValue(i) {
    return typeof i === "object" ? parseFloat(i.style.height.slice(0, -1)) : parseFloat(bars[i].style.height.slice(0, -1));
}

function calculateFreq(i) {
    return getValue(i) / 100 * (FREQ_MAX - FREQ_MIN) + FREQ_MIN;
}

stopButton.addEventListener('click', () => {
    running = false;
    stopButton.disabled = true;
    randomizeArrayButton.disabled = false;
    startButton.disabled = false;
});

startButton.addEventListener('click', () => {
    stopButton.disabled = false;
    startButton.disabled = true; 
    randomizeArrayButton.disabled = true;
});

startButton.addEventListener("click", async function () {
    running = true;
    switch (document.title) {
        case "Bubble Sort":
            await bubbleSort(bars);
            break;
        case "Insertion Sort":
            await insertionSort(bars);
            break;
        case "Selection Sort":
            await selectionSort(bars);
            break;
        case "Quick Sort":
            await quickSort(0, bars.length-1);
            break;
        case "Heap Sort":
            await heapSort(bars);
            break;
        case "Merge Sort":
            await mergeSort(bars, 0, bars.length);
            break;
        case "Radix Sort":
            await radixBucketSort(bars);
            break;
    } 
    batChest();
});