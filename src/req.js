window.addEventListener('load', function() {
    document.querySelector('.container').classList.add('in');
});

let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("sort-container");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;

let heightFactor = 1;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function () {
    numOfBars = slider.value;
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

    heightFactor = 100/numOfBars;
    return array;
}

document.addEventListener("DOMContentLoaded", function () {
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.left = `${i*heightFactor}%`;
    bar.style.width = `${heightFactor}%`;
    bar.style.height = `${array[i]*heightFactor}%`;
    bars_container.appendChild(bar);
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