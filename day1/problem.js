const fs = require('fs')
fs.readFile('./input1', (err, data) => {
  let input = data.toString('utf8').split('\n');
  let answer = process(input, {value: 0, history: {}})
  const answer_to_part_one = answer.value;
  
  while (!answer.first_double) {
    answer = process(input, answer)
  }
  
  console.log('PART ONE:', answer_to_part_one, 'PART TWO:', answer.first_double)
})

function process(data, accumulator) {
  return data.map(i => parseInt(i))
    .reduce((acc, val) => {
      acc.value = acc.value + val;
      if (acc.history[acc.value]) {
        acc.history[acc.value] = acc.history[acc.value] + 1;
        if (!acc.first_double) {
          acc.first_double = acc.value
        }
      } else {
        acc.history[acc.value] = 1
      }

      return acc;
    }, accumulator)
}
