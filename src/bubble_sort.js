async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "aqua";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        console.log('here');
        bars[j].style.height = `${array[j] * heightFactor}%`;
        bars[j].style.backgroundColor = "lightgreen";
        //bars[j].innerText = array[j];
        bars[j + 1].style.height = `${array[j+1] * heightFactor}%`;
        bars[j + 1].style.backgroundColor = "lightgreen";
        //bars[j + 1].innerText = array[j + 1];
        await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
  }
  return array;
}

sort_btn.addEventListener("click", function () {
  bubbleSort(unsorted_array);
});