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

async function insertionSortLeft(elements) {
    for (let i = 1; i < elements.length; i++) {
        if (!runningLeft) return;
        let j = i;
        while (j > 0 && !compareLeft(j, j-1)) {
            if (!runningLeft) return;
            await swapLeft(j, j-1);
            j--;
        }
    }
}

async function insertionSortRight(elements) {
    for (let i = 1; i < elements.length; i++) {
        if (!runningRight) return;
        let j = i;
        while (j > 0 && !compareRight(j, j-1)) {
            if (!runningRight) return;
            await swapRight(j, j-1);
            j--;
        }
    }
}