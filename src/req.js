'use strict';

window.addEventListener('load', function() {
    document.querySelector('.container').classList.add('in');
});

const RED = "bar-red";
const BLUE = "bar-blue";
const GREEN = "bar-green";

const NOTE_DURATION = 50;
const FREQ_MIN = 100;
const FREQ_MAX = 500;
const VOLUME = 0.005;
const audioCtx = new(window.AudioContext || window.webkitAudioContext)();

const randomize_array = document.getElementById("randomize_array_btn");
const sort_btn = document.getElementById("sort_btn");
const stop = document.getElementById("stop");

let bars_container = document.getElementById("sort-container");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");

let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 100/numOfBars;

let bars = [];
let running = false;

let speedFactor = 100;
let unsorted_array = new Array(numOfBars);


slider.addEventListener("input", function () {
    running = false;
    numOfBars = slider.value;
    heightFactor = 100/numOfBars;
    maxRange = slider.value;
    //console.log(numOfBars);
    bars_container.innerHTML = "";
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
    speedFactor = parseInt(e.target.value);
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
    let array = new Array(numOfBars);
    for (let i = 0; i < numOfBars; i++) {
        array[i] = i + 1;
    }

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener("DOMContentLoaded", function () {
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array) {
  bars = [];
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.left = `${i*heightFactor}%`;
    bar.style.width = `${heightFactor}%`;
    bar.style.height = `${array[i]*heightFactor}%`;
    bars_container.appendChild(bar);
    bars.push(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
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
    return unsorted_array[x] >= unsorted_array[y];
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
    playNote(freq, NOTE_DURATION);
    if (!running) return;
    changeColor(i, RED);
    [bars[i].style.left, bars[j].style.left] = [bars[j].style.left, bars[i].style.left];
    // console.log(bars[i], bars[j]);
    [unsorted_array[i], unsorted_array[j]] = [unsorted_array[j], unsorted_array[i]];
    [bars[i], bars[j]] = [bars[j], bars[i]];
    await sleep(speedFactor);
    resetColor(j);
}

async function batChest() {
    if (!isSorted()) return;
    for (let i = 0; i < numOfBars; i++) {
        let freq = Math.floor((unsorted_array[i] * heightFactor / 100) * (FREQ_MAX - FREQ_MIN) + FREQ_MIN);
        changeColor(i, GREEN);
        playNote(freq, NOTE_DURATION);
        await sleep(speedFactor);
    }
    for (let i = 0; i < numOfBars; i++) {
        resetColor(i);
        await sleep(speedFactor/5);
    }
    running = false;
}

function isSorted() {
    for (let i = 1; i < bars.length; i++) {
        if (!compare(i, i-1)) return false;
    }
    return true;
}

stop.addEventListener('click', () => {
    running = false;
});