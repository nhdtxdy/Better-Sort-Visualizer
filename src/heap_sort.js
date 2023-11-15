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

async function heapifyLeft(elements, length, i) {
    if (!runningLeft) return;
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    if (left < length && compareLeft(left, largest)) {
        largest = left;
    }

    if (right < length && compareLeft(right, largest)) {
        largest = right;
    }

    if (largest != i) {
        await swapLeft(i, largest);
        await heapifyLeft(elements, length, largest);
    }
}

async function heapifyRight(elements, length, i) {
    if (!runningRight) return;
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    if (left < length && compareRight(left, largest)) {
        largest = left;
    }

    if (right < length && compareRight(right, largest)) {
        largest = right;
    }

    if (largest != i) {
        await swapRight(i, largest);
        await heapifyRight(elements, length, largest);
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

async function heapSortLeft(elements) {
    let length = elements.length;
    let i = Math.floor(length / 2 - 1);
    let k = length - 1;

    while (i >= 0) {
        if (!runningLeft) return;
        await heapifyLeft(elements, length, i);
        i--;
    }

    while (k >= 0) {
        if (!runningLeft) return;
        await swapLeft(0, k);
        await heapifyLeft(elements, k, 0);
        k--;
    }
}
async function heapSortRight(elements) {
    let length = elements.length;
    let i = Math.floor(length / 2 - 1);
    let k = length - 1;

    while (i >= 0) {
        if (!runningRight) return;
        await heapifyRight(elements, length, i);
        i--;
    }

    while (k >= 0) {
        if (!runningRight) return;
        await swapRight(0, k);
        await heapifyRight(elements, k, 0);
        k--;
    }
}