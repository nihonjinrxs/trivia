const readline = require('readline');
const nthline = require('nthline');

const DATAFILE = './questions.csv';
const NUM_QUESTIONS = parseInt(nthline(0, DATAFILE), 10);

async function runQuiz () {
  let playing = true;
  let correctAnswers = 0;
  
  while (playing) {
    const question = readQuestion();
    displayQuestion(question);
    //{ correctAnswers, playing } = await waitForAnswer(question.correctAnswer, correctAnswers);
  }
}

async function waitForAnswer (correct, correctCount) {
  let playing = true;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('> ', (answer) => {
    if (answer == correct) {
      console.log('Correct!');
      correctCount++;
    } else {
      console.log('Incorrect');
      console.log(`Number of correct answers: ${correctAnswers}`);
      playing = false;
    }
  });
  return {
    correctAnswers: correctCount,
    playing: playing
  }
}

async function readQuestion () {
  const questionIndex = Math.floor((Math.random() * (NUM_QUESTIONS - 1)) + 1);
  console.log(questionIndex);
  const questionLine = await nthline(questionIndex, DATAFILE);
  console.log(questionLine);
  const questionFields = JSON.parse(`[${nthline(questionIndex, DATAFILE)}]`);
  console.log(questionFields);
}



if (require.main === module) {
  readQuestion()
}
