async function selectionSort(elements) {
    for (let i = 0; i < elements.length; i++) {
        let min = i;
        for (let j = i; j < elements.length; j++) {
            if (!running) return;
            if (!compare(j, min)) {
                min = j;
            }
        }
        await swap(i, min);
    }
}

async function selectionSortLeft(elements) {
    for (let i = 0; i < elements.length; i++) {
        let min = i;
        for (let j = i; j < elements.length; j++) {
            if (!runningLeft) return;
            if (!compareLeft(j, min)) {
                min = j;
            }
        }
        await swapLeft(i, min);
    }
}

async function selectionSortRight(elements) {
    for (let i = 0; i < elements.length; i++) {
        let min = i;
        for (let j = i; j < elements.length; j++) {
            if (!runningRight) return;
            if (!compareRight(j, min)) {
                min = j;
            }
        }
        await swapRight(i, min);
    }
}