/*-----------------------------------------------------Task A--------------------------------------------------------------------------------------*/
const table1 = document.querySelector('#table1');
let buttons;
function render() {
    let html = '';
    for(let i = 1; i<= 3; i++) {
        let htmlRow = '';
        for(let j = 1; j<= 3; j++) {
            htmlRow += `<td><button class="btn" data-i=${i} data-j="${j}"></button></td>`;
        }
        html+= `<tr>${htmlRow}</tr>`;
    }
    table1.innerHTML = html;
}

const win = [
    [1,2,3],
    [1,4,7],
    [1,5,9],
    [2,5,8],
    [3,6,9],
    [7,8,9],
    [4,5,6],
    [3,5,7]
]

function checkWin(value) {
    let arrData = [];
    buttons.forEach(bt => {
        arrData.push(bt.value? bt.value: '');
    });
    console.log(arrData);
    for(let item of win) {
        if(arrData[item[0]-1] === value && arrData[item[1]-1] === value && arrData[item[2]-1] === value) {
            return true;
        }
    }
    return false;
}

function handleClick() {   
    let XO = true;
    
    render();   
    buttons = document.querySelectorAll('.btn');
    buttons.forEach(bt => bt.addEventListener('click', function() {
        console.log(this.value)
        if(this.value) return;
        let value = XO? 'X': 'O';
        this.value = value;
        this.innerHTML = value;
        XO = !XO;
        if(checkWin(value)) {
           setTimeout(()=> {
            alert(value + " đã thắng");
           },100);
        }
    }));
}
reset.addEventListener('click', handleClick);
handleClick();
/*-----------------------------------------------------Task B--------------------------------------------------------------------------------------*/
const table2 = document.querySelector('#table2');
const numberCellsToWin = document.querySelector('#numberWin');
const row = document.querySelector('#row');
const oke = document.querySelector('#oke');
let numberCol, m = 5;
let arrData = [];
let buttons2;
function renderB() {
    console.log(1);
    numberRow = parseInt(row.value);
    
    m = parseInt(numberCellsToWin.value);
    let html = '';
    for(let i = 0; i< numberRow; i++) {
        let htmlRow = '';
        arrData[i] = [];
        for(let j = 0; j< numberRow; j++) {
            htmlRow += `<td><button class="btn2" data-i=${i} data-j="${j}"></button></td>`;
        }
        html += `<tr>${htmlRow}</tr>`;
    }
    console.log(html);
    table2.innerHTML = html;
    buttons2 = document.querySelectorAll('.btn2');
}

function handleClickB() {
    let XO2 = true;
    renderB();
    console.log(buttons2);
    buttons2.forEach(bt => bt.addEventListener('click', function() {
        let i = this.dataset.i,
            j = this.dataset.j;
        if(this.value) return;
        let value = XO2? 'X': 'O';
        this.value = value;
        arrData[i][j] = value;
        this.innerHTML = value;
        XO2 = !XO2;
        if(checkWinB(i,j,value)) {
            setTimeout(() => {
                alert(value+ " đã thắng");
            }, 100);
        }
    }));
}
function checkWinB(i,j,value) {
    return (checkNgang(i,j,value) || checkDoc(i,j,value) || checkCheoLR(i,j,value) || checkCheoRL(i,j,value));
}

function checkNgang(i,j,value) {
    let col = j;
    let count = 1;
    while(col > 0) {
        col--;
        if(arrData[i][col] === value) {
            count ++;
            if(count === m) return true;
        }
        else break
    }
    col = j;
    while(col < numberCol) {
        col++;
        if(arrData[i][col] === value) {
            count ++;
            if(count === m) return true;
        }
        else break;
    }
    return false;
}
function checkDoc(i,j,value) {
    let row = i;
    let count = 1;
    while(row > 0) {
        row--;
        if(arrData[row][j] === value) {
            count ++;
            if(count === m) return true;
        }
        else break;
    }
    row = i;
    while(row < numberCol) {
        row++;
        if(arrData[row][j] === value) {
            count ++;
            if(count === m) return true;
        }
        else break;
    }
    return false;
}
function checkCheoLR(i,j,value) {
    let row = i, col = j;
    let count = 1;
    while(row >0 && col >0) {
        row--;
        col--;
        if(arrData[row][col] === value) {
            count ++;
            if(count === m) return true;
        }
        else break;
    }
    row = i; col = j;
    while(row < numberRow && col < numberRow) {
        row++;
        col++;
        if(arrData[row][col] === value) {
            count ++;
            if(count === m) return true;
        }
        else break;
    }
    return false;
}
function checkCheoRL(i,j,value) {
    let row = i, col = j;
    let count = 1;
    while(row >0 && col < numberRow) {
        row--;
        col++;
        if(arrData[row][col] === value) {
            count ++;
            if(count === m) return true;
        }
        else break;
    }
    row = i; col = j;
    while(row < numberRow && col < numberRow) {
        row++;
        col--;
        if(arrData[row][col] === value) {
            count ++;
            if(count === m) return true;
        }
        else break;
    }
    return false;
}
oke.addEventListener('click', handleClickB );
reset2.addEventListener('click', handleClickB);