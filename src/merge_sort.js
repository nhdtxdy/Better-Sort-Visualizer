async function mergeSort(arr, start, end) {
    if (start >= end - 1) return;
    var mid = start + ~~((end - start) / 2);
  
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid, end);
  
    var cache = Array(end - start).fill(arr[0]);
    var k = mid;
  
    for (var i = start, r = 0; i < mid; r++, i++) {
      if (!running) return;
      while (k < end && getValue(arr[k]) < getValue(arr[i])) {
        cache[r] = arr[k];
        r++;
        k++;
      }
      cache[r] = arr[i];
    }
  
    for (var i = 0; i < k - start; i++) {
      if (!running) return;
      arr[i + start] = cache[i];
    //   arr[i + start].style.height = cache[i].style.height;
      arr[i + start].style.left = (100 / arr.length) * (i + start) + "%";
      changeColor(i + start, RED);
      // playNote(calculateFreq(i + start), NOTE_DURATION);
      await sleep(speedFactor);
      resetColor(i + start);
    }
  }

  async function mergeSortLeft(arr, start, end) {
    if (start >= end - 1) return;
    var mid = start + ~~((end - start) / 2);
  
    await mergeSortLeft(arr, start, mid);
    await mergeSortLeft(arr, mid, end);
  
    var cache = Array(end - start).fill(arr[0]);
    var k = mid;
  
    for (var i = start, r = 0; i < mid; r++, i++) {
      if (!runningLeft) return;
      while (k < end && getValueLeft(arr[k]) < getValueLeft(arr[i])) {
        cache[r] = arr[k];
        r++;
        k++;
      }
      cache[r] = arr[i];
    }
  
    for (var i = 0; i < k - start; i++) {
      if (!runningLeft) return;
      arr[i + start] = cache[i];
    //   arr[i + start].style.height = cache[i].style.height;
      arr[i + start].style.left = (100 / arr.length) * (i + start) + "%";
      changeColorLeft(i + start, RED);
      // playNote(calculateFreq(i + start), NOTE_DURATION);
      await sleep(speedFactor);
      resetColorLeft(i + start);
    }
  }

  async function mergeSortRight(arr, start, end) {
    if (start >= end - 1) return;
    var mid = start + ~~((end - start) / 2);
  
    await mergeSortRight(arr, start, mid);
    await mergeSortRight(arr, mid, end);
  
    var cache = Array(end - start).fill(arr[0]);
    var k = mid;
  
    for (var i = start, r = 0; i < mid; r++, i++) {
      if (!runningRight) return;
      while (k < end && getValueRight(arr[k]) < getValueRight(arr[i])) {
        cache[r] = arr[k];
        r++;
        k++;
      }
      cache[r] = arr[i];
    }
  
    for (var i = 0; i < k - start; i++) {
      if (!runningRight) return;
      arr[i + start] = cache[i];
    //   arr[i + start].style.height = cache[i].style.height;
      arr[i + start].style.left = (100 / arr.length) * (i + start) + "%";
      changeColorRight(i + start, RED);
      // playNote(calculateFreq(i + start), NOTE_DURATION);
      await sleep(speedFactor);
      resetColorRight(i + start);
    }
  }