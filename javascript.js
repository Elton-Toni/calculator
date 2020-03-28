let runningTotal = 0;
let buffer = '0'; // takes note about what's going to be displayed on the screen
let previousOperator = null;
let enteredEqual = false; // to keep trace if the user has entered equal

const screen = document.querySelector('.screen');

init();

function init() {
  document.querySelector('.calc-buttons').addEventListener('click', function (event) {
    // console.log(event);
    buttonClick(event.target.innerText);
  })
}

function buttonClick(value) {
  // debugger;

  // console.log("buffer = ", buffer);
  // console.log("previousOperator = ", previousOperator);

  // console.log(value);
  if (isNaN(value)) {
    // this is not a number
    handleSymbol(value);
  } else {
    // this is a number
    handleNumber(value);
  }

  // console.log('buffer =', buffer);
  screen.innerText = buffer;
  // console.log("\n\n");
}

function handleNumber(numberString) {
  if (buffer === "0" || enteredEqual) {
    buffer = numberString;
    if (enteredEqual) {
      enteredEqual = false;
      previousOperator = null;
      runningTotal = 0;
    }
  } else {
    buffer += numberString;
  }
  // console.log("numberString = ", numberString);
  // console.log("buffer = ", buffer);
}

function handleSymbol(symbol) {
  // if (symbol === 'C') {
  //   buffer = '0';
  //   runningTotal = 0;
  // } else if (symbol === ) { }
  switch (symbol) {
    case 'C':
      buffer = '0';
      runningTotal = 0;
      break;

    case '+':
    case '−':
    case '×':
    case '÷':
      // console.log("symbol --> ", symbol);
      handleMath(symbol);
      break;

    case '=':
      if (previousOperator === null) {
        //you need two number to do math
        return
      }
      flushOperation(parseInt(buffer));
      buffer = runningTotal;
      // previousOperator = null;
      // runningTotal = 0;
      enteredEqual = true;
      break;

    case '←':
      if (enteredEqual) {
        buffer = '0';
        runningTotal = 0;
      } else if (buffer.length === 1) {
        buffer = '0';
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    default:
      break;
  }
}

function handleMath(symbol) {
  if (buffer === '0') {
    // do nothing
    return;
  }

  const intBuffer = +buffer; // it's the same as --> const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else if (enteredEqual) {
    previousOperator = symbol;
    enteredEqual = false;
    // buffer = '0';
  } else {
    flushOperation(intBuffer);
  }

  // console.log("runningTotal = ", runningTotal);
  if (buffer !== '0')
    buffer = '0';

  if (previousOperator !== symbol)
    previousOperator = symbol;
}

function flushOperation(intBuffer) {
  if (previousOperator === '+')
    runningTotal += intBuffer;
  else if (previousOperator === '−')
    runningTotal -= intBuffer;
  else if (previousOperator === '×')
    runningTotal *= intBuffer;
  else if (previousOperator === '÷')
    runningTotal /= intBuffer;
}
