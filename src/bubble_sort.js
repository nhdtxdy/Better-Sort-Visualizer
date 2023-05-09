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

sort_btn.addEventListener("click", async function () {
    running = true;
    await bubbleSort(unsorted_array);
    batChest();
});