const table = document.querySelector('#table');
        const thead = document.querySelector('thead');
        const tbody = document.querySelector('tbody'); 
        const submit = document.querySelector('#submit');
        const row = document.querySelector('#row');
        const col = document.querySelector('#col');

        let numberCol, numberRow, tampRow;
        let data= [];
        let buttons;

        function renderThead() {
            let htmlRow = '';
            for(let i = 0 ; i < numberCol; i++) {
                htmlRow += `<th><button class="btn" data-i=${i} data-value="0">${i+1}</button></th>`;
            }
            thead.innerHTML = `<tr>${htmlRow}</tr>`;
            buttons = document.querySelectorAll('button.btn');
            console.log(buttons)
        }

        function randomNumber() {
            return Math.floor(Math.random()*1000) + 1;
        }

        function renderBody() {
            tampRow = numberRow;
            if (numberRow > 100) {
                tampRow = 100;
            }
            let html = '';
            for(let i = 0; i< tampRow; i++) {
                data[i] = []
                let htmlRow = '';
                for(let j = 0; j< numberCol; j++) {
                    let nb = randomNumber();
                    htmlRow += `<td><h4>${nb}<h4></td>`;
                    data[i][j] = nb;
                }
                html += `<tr data-i="${i}">${htmlRow}</tr>`;
            }
            tbody.innerHTML = html;
        }

        function sortTang(a,i) {
            return a.sort((aa,bb) => aa[i] - bb[i]);
        }

        function sortGiam(a,i) {
            return a.sort((aa,bb) => bb[i] - aa[i]);
        }

        function renderAfterSort(a) {
            let html = '';
            for(let i = 0; i< tampRow; i++) {
                let htmlRow = '';
                for(let j = 0; j< numberCol; j++) {
                    htmlRow += `<td><h4>${a[i][j]}<h4></td>`;
                }
                html += `<tr data-i="${i}">${htmlRow}</tr>`;
            }
            tbody.innerHTML = html;
        }
        
        function loadFromTo(start, end) {
            let html = '';
            for(let i = start; i< end; i++) {
                let htmlRow = '';
                data[i] = []
                for(let j = 0; j< numberCol; j++) {
                    let nb = randomNumber();
                    htmlRow += `<td><h4>${nb}<h4></td>`;
                    data[i][j] = nb;
                }
                html += `<tr data-i="${i}">${htmlRow}</tr>`;
            }
            tbody.innerHTML += html;
            tampRow = end;
        }
        submit.addEventListener('click', () => {
            numberCol = col.value;
            numberRow = row.value;
            renderThead();
            renderBody();
            buttons.forEach(bt => bt.addEventListener('click', function(e) {
                if(this.dataset.value === "0") {
                    renderAfterSort(sortTang(data, this.dataset.i));
                    this.dataset.value = "1";
                }
                else {
                    renderAfterSort(sortGiam(data, this.dataset.i));
                    this.dataset.value = "0";
                }
            }));
            window.addEventListener('scroll', function() {
                if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
                    loadFromTo(tampRow, numberRow - tampRow > 100? tampRow+100: numberRow);
                }
            })
        });