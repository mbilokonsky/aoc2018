const fs = require('fs')
fs.readFile('./input1', (err, data) => {
  let input = data.toString('utf8').split('\n');
  let candidate = input.reduce((acc, val) => {
    if (acc) { return acc; }
    
    let candidate;

    input.forEach(item => {
      let diff = computeDiff(val, item);
      if (diff.length === 1) {
        let index = diff[0];
        candidate = val
          .split('')
          .filter((_, i) => i !== index)
          .join('')
      }
    })
    
    if (candidate) {
      return candidate
    }

  }, null);

  console.log("PART TWO ANSWER:", candidate)
})

const computeDiff = (str1, str2) => {
  let differences = [];
  str1.split('').forEach((char, index) => {
    if (str2[index] != char) { differences.push(index) }
  })

  return differences
}