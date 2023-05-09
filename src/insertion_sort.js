'use strict';

async function insertionSort(elements) {
    for (let i = 1; i < elements.length; i++) {
        if (!running) return;
        let j = i;
        while (j > 0 && !compare(j, j-1)) {
            if (!running) return;
            await swap(j, j-1);
            j--;
        }
    }
}

sort_btn.addEventListener("click", async function () {
    running = true;
    await insertionSort(unsorted_array);
    batChest();
});