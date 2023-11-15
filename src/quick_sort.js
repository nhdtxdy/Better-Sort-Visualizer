async function quickSort(left, right) {
    if (left < right) {
        let pivot = left;
        changeColor(pivot, RED);
        let i = left;
        let j = right;
        changeColor(j, BLUE);

		while (i < j) {
            if (!running) return;
            while (compare(pivot, i) && i < j) {
                resetColor(i);
                i++;
                changeColor(i, GREEN);
            }
			while (!compare(pivot, j)) {
                resetColor(j);
                j--;
                changeColor(j, BLUE);
            }
            changeColor(pivot, RED);
            if (i < j) {
				await swap(i, j);
            }
        }
        await swap(pivot, j);
        resetColor(i);
        resetColor(j);
        resetColor(pivot);
        await quickSort(left, j - 1);
		await quickSort(j + 1, right);
    }
}

async function quickSortLeft(left, right) {
    if (left < right) {
        let pivot = left;
        changeColorLeft(pivot, RED);
        let i = left;
        let j = right;
        changeColorLeft(j, BLUE);

		while (i < j) {
            if (!runningLeft) return;
            while (compareLeft(pivot, i) && i < j) {
                resetColorLeft(i);
                i++;
                changeColorLeft(i, GREEN);
            }
			while (!compareLeft(pivot, j)) {
                resetColorLeft(j);
                j--;
                changeColorLeft(j, BLUE);
            }
            changeColorLeft(pivot, RED);
            if (i < j) {
				await swapLeft(i, j);
            }
        }
        await swapLeft(pivot, j);
        resetColorLeft(i);
        resetColorLeft(j);
        resetColorLeft(pivot);
        await quickSortLeft(left, j - 1);
		await quickSortLeft(j + 1, right);
    }
}

async function quickSortRight(left, right) {
    if (left < right) {
        let pivot = left;
        changeColorRight(pivot, RED);
        let i = left;
        let j = right;
        changeColorRight(j, BLUE);

		while (i < j) {
            if (!runningRight) return;
            while (compareRight(pivot, i) && i < j) {
                resetColorRight(i);
                i++;
                changeColorRight(i, GREEN);
            }
			while (!compareRight(pivot, j)) {
                resetColorRight(j);
                j--;
                changeColorRight(j, BLUE);
            }
            changeColorRight(pivot, RED);
            if (i < j) {
				await swapRight(i, j);
            }
        }
        await swapRight(pivot, j);
        resetColorRight(i);
        resetColorRight(j);
        resetColorRight(pivot);
        await quickSortRight(left, j - 1);
		await quickSortRight(j + 1, right);
    }
}