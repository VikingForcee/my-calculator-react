import { useState } from 'react';

export default function App() {
  const [display, setDisplay] = useState('0');

  const[previousValue, setPreviousValue] = useState(null);
  const[operation, setOperation] = useState(null);
  const[waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num) => {
    if(waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    }
    else{
      setDisplay(display === '0' ? String(num) : display + num); // basic inputing
    }
  };

  const inputDecimal = () => {
    if(waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    }
    else if(display.indexOf('.' === -1)){
      setDisplay(display + '.'); // basic inputing
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if(previousValue === null){
      setPreviousValue(inputValue);
    }
    else if(operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+': 
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case 'x':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if(previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  }


  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm'>
        {/* Display */}
        <div className='mb-4'>
          <div className='bg-gray-900 text-white p-4 rounded-lg text-3xl font-mono min-h-[60px] flex items-center justify-end'>
              {display}
          </div>
          <div className='text-xs text-gray-500 text-center mt-1'>
            {operation && `Previous: ${previousValue} | Operation: ${operation}`}
          </div>
        </div>

        <div className='grid grid-cols-4 gap-3'>
          <button
            onClick={clear}
            className='col-span-2 h-16 text-xl font-semibold rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200'>
            Clear
          </button>
          <button
            onClick={() => inputOperation('/')}
            className='h-16 text-xl font-semibold rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200'>
            /
          </button>
          <button
            onClick={() => inputOperation('x')}
            className='h-16 text-xl font-semibold rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200'>
            x
          </button>
          

          <button
            onClick={() => inputNumber(7)}
            className='h-16 text-xl font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200'>
            7
          </button>
          <button
            onClick={() => inputNumber(8)}
            className='h-16 text-xl font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200'>
            8
          </button>
          <button
            onClick={() => inputNumber(9)}
            className='h-16 text-xl font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200'>
            9
          </button>
          <button
            onClick={() => inputOperation('-')}
            className='h-16 text-xl font-semibold rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200'>
            -
          </button>

          <button
            onClick={() => inputNumber(4)}
            className='h-16 text-xl font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200'>
            4
          </button>
          <button
            onClick={() => inputNumber(5)}
            className='h-16 text-xl font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200'>
            5
          </button>
          <button
            onClick={() => inputNumber(6)}
            className='h-16 text-xl font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200'>
            6
          </button>
          <button
            onClick={() => inputOperation('+')}
            className='h-16 text-xl font-semibold rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200'>
            +
          </button>

          <button
            onClick={() => inputNumber(1)}
            className='h-16 text-xl font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200'>
            1
          </button>
          <button
            onClick={() => inputNumber(2)}
            className='h-16 text-xl font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200'>
            2
          </button>
          <button
            onClick={() => inputNumber(3)}
            className='h-16 text-xl font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200'>
            3
          </button>

          <button
            onClick={performCalculation}
            className='row-span-2 h-auto text-xl font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 '>
              =
          </button>

          <button
          onClick={() => inputNumber(0)}
          className='col-span-2 h-16 text-xl font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200'>
            0
          </button>
          <button
          onClick={() => inputDecimal(0)} // we wrote seperate logic for decimal because we dont want repeating decimals
          className='h-16 text-xl font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200'>
            .
          </button>
        </div>
      </div>
    </div>
  );
}