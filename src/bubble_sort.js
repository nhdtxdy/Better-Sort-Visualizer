'use strict';

async function bubbleSort(array) {
    for (let i = 1; i < array.length; i++) {
        for (let j = 0; j < array.length-i; j++) {
            if (!running) return;
            if (compare(j, j+1)) {
                await swap(j, j+1);
            }
        }
    }
}

async function bubbleSortLeft(array) {
    for (let i = 1; i < array.length; i++) {
        for (let j = 0; j < array.length-i; j++) {
            if (!runningLeft) return;
            if (compareLeft(j, j+1)) {
                await swapLeft(j, j+1);
            }
        }
    }
}

async function bubbleSortRight(array) {
    for (let i = 1; i < array.length; i++) {
        for (let j = 0; j < array.length-i; j++) {
            if (!runningRight) return;
            if (compareRight(j, j+1)) {
                await swapRight(j, j+1);
            }
        }
    }
}