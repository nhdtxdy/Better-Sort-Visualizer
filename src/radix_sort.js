async function radixBucketSort (arr) {
    var idx1, idx2, idx3, len1, len2, radix, radixKey;
    var radices = {}, buckets = {}, num, curr;
    var currLen, radixStr, currBucket;

    len1 = arr.length;
    len2 = 10;

    for (idx1 = 0;idx1 < len1;idx1++) {
     radices[(parseInt(getValue(idx1)*10)).toString().length] = 0;
    }

    for (radix in radices) {
     len1 = arr.length;
     for (idx1 = 0;idx1 < len1;idx1++) {
       curr = parseInt(getValue(idx1)*10);
       currLen = curr.toString().length;
       if (currLen >= radix) {

         radixKey = curr.toString()[currLen - radix];

         if (!buckets.hasOwnProperty(radixKey)) {
           buckets[radixKey] = [];
         }

         buckets[radixKey].push(curr);
       } else {
         if (!buckets.hasOwnProperty('0')) {
           buckets['0'] = [];
         }
         buckets['0'].push(curr);
       }
     }

     idx1 = 0;
     for (idx2 = 0;idx2 < len2;idx2++) {
         if (!running) return;
       if (buckets[idx2] != null) {
         currBucket = buckets[idx2];
         len1 = currBucket.length;
         for (idx3 = 0;idx3 < len1;idx3++) {

             if (!running) return;
            if (idx1 < arr.length) resetColor(idx1);
            arr[idx1].style.height = currBucket[idx3] / 10 + "%";
            playNote(calculateFreq(idx1), NOTE_DURATION);
            idx1++;
            if (idx1 < arr.length) changeColor(idx1, RED);
            await sleep(speedFactor);
         }
       }
     }
     buckets = {};
    }
}

async function radixBucketSortLeft(arr) {
    var idx1, idx2, idx3, len1, len2, radix, radixKey;
    var radices = {}, buckets = {}, num, curr;
    var currLen, radixStr, currBucket;

    len1 = arr.length;
    len2 = 10;

    for (idx1 = 0;idx1 < len1;idx1++) {
     radices[(parseInt(getValueLeft(idx1)*10)).toString().length] = 0;
    }

    for (radix in radices) {
     len1 = arr.length;
     for (idx1 = 0;idx1 < len1;idx1++) {
       curr = parseInt(getValueLeft(idx1)*10);
       currLen = curr.toString().length;
       if (currLen >= radix) {

         radixKey = curr.toString()[currLen - radix];

         if (!buckets.hasOwnProperty(radixKey)) {
           buckets[radixKey] = [];
         }

         buckets[radixKey].push(curr);
       } else {
         if (!buckets.hasOwnProperty('0')) {
           buckets['0'] = [];
         }
         buckets['0'].push(curr);
       }
     }

     idx1 = 0;
     for (idx2 = 0;idx2 < len2;idx2++) {
         if (!runningLeft) return;
       if (buckets[idx2] != null) {
         currBucket = buckets[idx2];
         len1 = currBucket.length;
         for (idx3 = 0;idx3 < len1;idx3++) {

             if (!runningLeft) return;
            if (idx1 < arr.length) resetColorLeft(idx1);
            arr[idx1].style.height = currBucket[idx3] / 10 + "%";
            // playNote(calculateFreq(idx1), NOTE_DURATION);
            idx1++;
            if (idx1 < arr.length) changeColorLeft(idx1, RED);
            await sleep(speedFactor);
         }
       }
     }
     buckets = {};
    }
}

async function radixBucketSortRight(arr) {
    var idx1, idx2, idx3, len1, len2, radix, radixKey;
    var radices = {}, buckets = {}, num, curr;
    var currLen, radixStr, currBucket;

    len1 = arr.length;
    len2 = 10;

    for (idx1 = 0;idx1 < len1;idx1++) {
     radices[(parseInt(getValueRight(idx1)*10)).toString().length] = 0;
    }

    for (radix in radices) {
     len1 = arr.length;
     for (idx1 = 0;idx1 < len1;idx1++) {
       curr = parseInt(getValueRight(idx1)*10);
       currLen = curr.toString().length;
       if (currLen >= radix) {

         radixKey = curr.toString()[currLen - radix];

         if (!buckets.hasOwnProperty(radixKey)) {
           buckets[radixKey] = [];
         }

         buckets[radixKey].push(curr);
       } else {
         if (!buckets.hasOwnProperty('0')) {
           buckets['0'] = [];
         }
         buckets['0'].push(curr);
       }
     }

     idx1 = 0;
     for (idx2 = 0;idx2 < len2;idx2++) {
         if (!runningRight) return;
       if (buckets[idx2] != null) {
         currBucket = buckets[idx2];
         len1 = currBucket.length;
         for (idx3 = 0;idx3 < len1;idx3++) {

             if (!runningRight) return;
            if (idx1 < arr.length) resetColorRight(idx1);
            arr[idx1].style.height = currBucket[idx3] / 10 + "%";
            // playNote(calculateFreq(idx1), NOTE_DURATION);
            idx1++;
            if (idx1 < arr.length) changeColorRight(idx1, RED);
            await sleep(speedFactor);
         }
       }
     }
     buckets = {};
    }
}