const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext("2d");
        const start = document.querySelector('#start');
        const xuyentuong = document.querySelector('#xuyentuong');
        const diem = document.querySelector('#score');
        canvas.width = 400;
        canvas.height = 400;
        const sizeCell = 20;
        let id;
        let isXuyenTuong;
        let score = 0;
        let snake = {
            x: sizeCell*9,
            y: sizeCell*9,
            dx: sizeCell,
            dy: 0,
            body: [],
            length: 4,
            color: 'green'
        }

        function drawSnake() {
            for(let i = 0; i< snake.body.length; i++) {
                if(i === 0) {
                    ctx.fillStyle = '#1ba3b5';
                    ctx.fillRect(snake.body[i].x, snake.body[i].y, sizeCell -1 , sizeCell-1);
                }
                else {
                    
                ctx.fillStyle = snake.color;  
                ctx.fillRect(snake.body[i].x, snake.body[i].y, sizeCell - 1, sizeCell -1);
                }
            }
        }

        
        const food = {
            x: Math.floor(Math.random() * 20) *sizeCell,
            y: Math.floor(Math.random() * 20) *sizeCell,
            color: 'red'
        }
        function checkBien() {
            if(snake.x === canvas.width) {
                console.log(snake.x)
                snake.x = 0;
            }
            else if (snake.x < 0) {
                snake.x = canvas.width - sizeCell;
            }
            else if (snake.y === canvas.height) {
                snake.y = 0;
            }
            else if (snake.y < 0) {
                snake.y = canvas.height - sizeCell;
            }
        }
        function checkNotXuyenTuong() {
            if (snake.body[0].x >= canvas.width  || snake.body[0].x < 0 || snake.body[0].y >= canvas.height || snake.body[0].y < 0 ) {
                return true;
            } 
            return false;
        }
        let keys = [];
        function chuyenHuong() {
            document.addEventListener('keydown', function(e) {
                keys.push(e.keyCode);
            });
            let key = keys[keys.length - 1];
            console.log(key);
            if(key === 37 && snake.dx === 0 ) {
                snake.dx = -sizeCell;
                snake.dy = 0;
            }
            else if(key === 38 && snake.dy === 0) {
                snake.dy = -sizeCell;
                snake.dx = 0;
            }
            else if(key === 39 && snake.dx === 0) {
                snake.dx = sizeCell;
                snake.dy = 0;
            }
            else if(key === 40 && snake.dy === 0) {
                snake.dy = sizeCell;
                snake.dx = 0;
            }
            else {
                return;
            }
            keys= [];
        }

        function checkEnd() {
            for(let i = 1; i< snake.body.length; i++) {
                if(snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y) {
                    return true;
                }
            }
            return false;
        }
        function drawFood() {
            ctx.fillStyle = food.color;
            ctx.fillRect(food.x, food.y, sizeCell -1, sizeCell-1);
        }
        function snakeEatFood() {
            if(snake.x === food.x && snake.y === food.y) {
                score++;
                snake.length++;
                food.x = Math.floor(Math.random() * 20) *sizeCell,
                food.y = Math.floor(Math.random() * 20) *sizeCell,
                drawFood();
                diem.innerHTML = score;
            }
        }
        function reset() {
            snake = {
                x: sizeCell*9,
                y: sizeCell*9,
                dx: sizeCell,
                dy: 0,
                body: [],
                length: 4,
                color: 'black'
            }
        }
        function handleSnake() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            drawFood();
            snakeEatFood();
            if(checkEnd()) {
                alert('Bạn thua rồi .... Ahihi');
                clearInterval(id);
                reset();
            }
            else {
                snake.x += snake.dx;
                snake.y += snake.dy;
            }
            snake.body.unshift({x: snake.x, y: snake.y});
            if(snake.body.length > snake.length) {
                snake.body.pop();
            }
            checkBien();
            
            drawSnake();
            chuyenHuong();
        }
        const time = 1000;
        function handleSnakeXuyenTuong() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            drawFood();
            snakeEatFood();
            snake.body.unshift({x: snake.x, y: snake.y});
            if(snake.body.length > snake.length) {
                snake.body.pop();
            }
            if(checkEnd() || checkNotXuyenTuong()) {
                alert('Bạn thua rồi .... Ahihi');
                clearInterval(id);
                reset();
            }
            else {
                snake.x += snake.dx;
                snake.y += snake.dy;
            }
            
            drawSnake();
            chuyenHuong();
        }

        start.addEventListener('click', () => {
            clearInterval(id);
            reset();
            // console.log(xuyentuong.checked);
            isXuyenTuong = xuyentuong.checked;
            if(isXuyenTuong) { 
                id = setInterval(handleSnake,time);
            }
            else {
                id = setInterval(handleSnakeXuyenTuong,time);
            }
        });