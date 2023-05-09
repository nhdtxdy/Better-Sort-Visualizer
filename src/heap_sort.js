'use strict';

async function heapify(elements, length, i) {
    if (!running) return;
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    if (left < length && compare(left, largest)) {
        largest = left;
    }

    if (right < length && compare(right, largest)) {
        largest = right;
    }

    if (largest != i) {
        await swap(i, largest);
        await heapify(elements, length, largest);
    }
}

async function heapSort(elements) {
    let length = elements.length;
    let i = Math.floor(length / 2 - 1);
    let k = length - 1;

    while (i >= 0) {
        if (!running) return;
        await heapify(elements, length, i);
        i--;
    }

    while (k >= 0) {
        if (!running) return;
        await swap(0, k);
        await heapify(elements, k, 0);
        k--;
    }
}
  
sort_btn.addEventListener("click", async function () {
    running = true;
    await heapSort(unsorted_array);
    batChest();
});