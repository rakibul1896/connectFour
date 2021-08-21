// DOM Elements
const allCells = document.querySelectorAll('.cell');
const allCellsArray = [...allCells];
const playerRed = document.querySelector('.playerRed');
const playerYellow = document.querySelector('.playerYellow');
const resetButton = document.querySelectorAll('.reset');
const text = document.querySelector('.text');
const congratulation = document.querySelector('.congratulation');

// columns
const column0 = [
  allCells[40],
  allCells[32],
  allCells[24],
  allCells[16],
  allCells[8],
  allCells[0],
];
const column1 = [
  allCells[41],
  allCells[33],
  allCells[25],
  allCells[17],
  allCells[9],
  allCells[1],
];
const column2 = [
  allCells[42],
  allCells[34],
  allCells[26],
  allCells[18],
  allCells[10],
  allCells[2],
];
const column3 = [
  allCells[43],
  allCells[35],
  allCells[27],
  allCells[19],
  allCells[11],
  allCells[3],
];
const column4 = [
  allCells[44],
  allCells[36],
  allCells[28],
  allCells[20],
  allCells[12],
  allCells[4],
];
const column5 = [
  allCells[45],
  allCells[37],
  allCells[29],
  allCells[21],
  allCells[13],
  allCells[5],
];
const column6 = [
  allCells[46],
  allCells[38],
  allCells[30],
  allCells[22],
  allCells[14],
  allCells[6],
];
const column7 = [
  allCells[47],
  allCells[39],
  allCells[31],
  allCells[23],
  allCells[15],
  allCells[7],
];
const columns = [
  column0,
  column1,
  column2,
  column3,
  column4,
  column5,
  column6,
  column7,
];

// rows
const row0 = [
  allCells[0],
  allCells[1],
  allCells[2],
  allCells[3],
  allCells[4],
  allCells[5],
  allCells[6],
  allCells[7],
];
const row1 = [
  allCells[8],
  allCells[9],
  allCells[10],
  allCells[11],
  allCells[12],
  allCells[13],
  allCells[14],
  allCells[15],
];
const row2 = [
  allCells[16],
  allCells[17],
  allCells[18],
  allCells[19],
  allCells[20],
  allCells[21],
  allCells[22],
  allCells[23],
];
const row3 = [
  allCells[24],
  allCells[25],
  allCells[26],
  allCells[27],
  allCells[28],
  allCells[29],
  allCells[30],
  allCells[31],
];
const row4 = [
  allCells[32],
  allCells[33],
  allCells[34],
  allCells[35],
  allCells[36],
  allCells[37],
  allCells[38],
  allCells[39],
];
const row5 = [
  allCells[40],
  allCells[41],
  allCells[42],
  allCells[43],
  allCells[44],
  allCells[45],
  allCells[46],
  allCells[47],
];
const rows = [row0, row1, row2, row3, row4, row5];

// variables
let gameIsLive = true;
let activePlayer = true;

// function
const getCellPosition = (cellNum) => {
  let columnNum = cellNum % 8;
  let rowNum = Math.floor(cellNum / 8);

  return [rowNum, columnNum];
};

const getClassList = (cell) => {
  let divClassList;
  if (cell.classList) {
    divClassList = [...cell.classList];
  }

  return divClassList;
};

const getShowingCell = (columnNum) => {
  const clickedColumn = columns[columnNum];
  for (const cell of clickedColumn) {
    const classList = cell.classList;
    const cellClassList = [...classList];
    if (!cellClassList.includes('red') && !cellClassList.includes('yellow')) {
      return cell;
    }
  }

  return null;
};

const getColor = (cell) => {
  const classList = getClassList(cell);
  if (classList.includes('red')) return 'red';
  if (classList.includes('yellow')) return 'yellow';
};

const winningState = (winnerArr) => {
  const arrLength = winnerArr.length;
  if (arrLength > 3) {
    gameIsLive = false;
    return true;
  }
  return null;
};

const getTheWinner = (rowNum, columnNum) => {
  const cell = rows[rowNum][columnNum];
  const color = getColor(cell);

  let winnerArr = [cell];

  // horizontally match
  
  let changeColumn = columnNum + 1;
  let changeRow = rowNum;
  while (changeColumn <= 7) {
    const cell = rows[changeRow][changeColumn];
    const sibLingColor = getColor(cell);
    if (color === sibLingColor) {
      winnerArr.push(cell);
      changeColumn++
    } else {
      break;
    }
  }

  
  changeColumn = columnNum - 1;
  while (changeColumn >= 0) {
    const cell = rows[rowNum][changeColumn];
    const sibLingColor = getColor(cell);
    if (color === sibLingColor) {
      winnerArr.push(cell);
      changeColumn--
    } else {
      break;
    }
  }

  if (winningState(winnerArr)) return winnerArr;

  // vertically match
  winnerArr = [cell];
  changeColumn = columnNum;
  changeRow = rowNum + 1;

  while ( changeRow <= 5) {
    const cell = rows[changeRow][changeColumn];
    const sibLingColor = getColor(cell);
    if (color === sibLingColor) {
      winnerArr.push(cell);
      changeRow++
    } else {
      break;
    }
  }

  if (winningState(winnerArr)) return winnerArr;

  // diagonally match
  winnerArr = [cell];
  changeColumn = columnNum - 1;
  changeRow = rowNum + 1;
  while (changeColumn >= 0 && changeRow <= 5) {
    const cell = rows[changeRow][changeColumn];
    const sibLingColor = getColor(cell);
    if (color === sibLingColor) {
      winnerArr.push(cell);
      changeColumn--;
      changeRow++;
    } else {
      break;
    }
  }
 
  
  changeColumn = columnNum + 1;
  changeRow = rowNum - 1;
  while (changeColumn <= 7 && changeRow >= 0) {
    const cell = rows[changeRow][changeColumn];
    const sibLingColor = getColor(cell);
    if (color === sibLingColor) {
      winnerArr.push(cell);
      changeColumn++;
      changeRow--;
    } else {
      break;
    }
  }

  if (winningState(winnerArr)) return winnerArr;

  // diagonally match 2nd

  winnerArr = [cell];
  changeColumn = columnNum - 1;
  changeRow = rowNum - 1;
  while (changeColumn >= 0 && changeRow >= 0) {
    const cell = rows[changeRow][changeColumn];
    const sibLingColor = getColor(cell);
    if (color === sibLingColor) {
      winnerArr.push(cell);
      changeColumn--;
      changeRow--;
    } else {
      break;
    }
  }
 
  
  changeColumn = columnNum + 1;
  changeRow = rowNum + 1;
  while (changeColumn <= 7 && changeRow <= 5) {
    const cell = rows[changeRow][changeColumn];
    const sibLingColor = getColor(cell);
    if (color === sibLingColor) {
      winnerArr.push(cell);
      changeColumn++;
      changeRow++;
    } else {
      break;
    }
  }

  if (winningState(winnerArr)) return winnerArr;
};

// Handle event function
const onClickHandler = (cellNum) => {
  if (!gameIsLive) return;
  let [rowNum, columnNum] = getCellPosition(cellNum);
  const showingCell = getShowingCell(columnNum);
  if (showingCell) {
    if (activePlayer) {
      showingCell.classList.add('red');
      activePlayer = false;
      playerRed.style.display = 'none';
      playerYellow.style.display = 'inline-block';
    } else {
      showingCell.classList.add('yellow');
      activePlayer = true;
      playerRed.style.display = 'inline-block';
      playerYellow.style.display = 'none';
    }
  } else {
    return;
  }

  
  const classList = getClassList(showingCell);
  const rowName = classList.find((val) => val.includes('row'));
  rowNum = parseInt(rowName.charAt(rowName.length - 1));

  const getWinner = getTheWinner(rowNum, columnNum);
  if (getWinner) {
    const color = getColor(getWinner[0]);
    if (color === 'red') {
      window.setTimeout(() => {
        getWinner.map((val) => {
          val.classList.add('redWin');
        });
      }, 500);
      window.setTimeout(() => {
        text.innerHTML = 'Red ';
        text.style.color = 'rgba(176, 26, 11, 1)';
        congratulation.style.display = 'block';
      }, 1000);
    } else {
      window.setTimeout(() => {
        getWinner.map((val) => {
          val.classList.add('yellowWin');
        });
      }, 500);

      window.setTimeout(() => {
        text.innerHTML = 'Yellow ';
        text.style.color = 'rgba(208, 208, 21, 1)';
        congratulation.style.display = 'block';
      }, 1000);
    }
  }


 let tieArr =[];

for(let i = 0; i < allCellsArray.length; i++){
  const color = getColor(allCellsArray[i]);
  tieArr.push(color);
}

const tie = tieArr.includes(undefined);
  if(!tie){
    window.setTimeout(() => {
      text.innerHTML = 'No One ';
      text.style.color = 'rgba(176, 26, 11, 1)';
      congratulation.style.display = 'block';
      gameIsLive = false;
    }, 1000);
  }
};

// looping of allCells

for (let cellNum = 0; cellNum < allCellsArray.length; cellNum++) {
  allCellsArray[cellNum].addEventListener('click', () => {
    onClickHandler(cellNum);
    
  });
}

const resetButtonArr = [...resetButton];

resetButtonArr.map((val) => {
  val.addEventListener('click', () => {
    for (let cellNum of allCellsArray) {
      cellNum.classList.remove('red');
      cellNum.classList.remove('yellow');
      cellNum.classList.remove('redWin');
      cellNum.classList.remove('yellowWin');
      playerRed.style.display = 'inline-block';
      playerYellow.style.display = 'none';
      congratulation.style.display = 'none';
      gameIsLive = true;
      activePlayer = true;
    }
  });
});

playerRed.addEventListener('click', () => {
  let randomNum = Math.floor(Math.random() * 8);
  onClickHandler(randomNum);
});

playerYellow.addEventListener('click', () => {
  let randomNum = Math.floor(Math.random() * 8);
  onClickHandler(randomNum);
});
