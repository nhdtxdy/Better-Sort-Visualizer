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

startButton.addEventListener("click", async function () {
    running = true;
    await quickSort(0, bars.length - 1);
    batChest();
});