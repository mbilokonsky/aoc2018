const fs = require('fs')
fs.readFile('./input1', (err, data) => {
  let input = data.toString('utf8').split('\n');
  let count = input.reduce((acc, val) => {
    let breakdown = val.split('')
      .reduce((counters, character) => {
        if (counters[character]) {
          counters[character] = counters[character] + 1;
        } else {
          counters[character] = 1
        }

        return counters;
      }, {});

    if (hasCount(breakdown, 2)) {
      acc.x2 += 1;
    }
    
    if (hasCount(breakdown, 3)) {
      acc.x3 += 1;
    }

    return acc;
  }, { x2: 0, x3: 0 })

  console.log('PART ONE ANSWER:', count.x2 * count.x3) 
})

const hasCount = (breakdown, count) => Object.values(breakdown).some(x => x === count);