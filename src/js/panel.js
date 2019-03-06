function init() {

    console.log('-->Va datos del panel');

    let url = 'http://127.0.0.1:3333/listDataHeaderAdmin';

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {

            console.log(data);

            document.getElementById('visitas').innerText = data[0].total_visitas;
            document.getElementById('sesiones').innerText = data[0].total_visitas_sesiones;
            document.getElementById('clicks').innerText = data[0].cant_clicks;
            document.getElementById('permanencia').innerText = data[0].total_promedio_visita;

            loadTableData();

        })
        .catch(error => console.error('Error: ', error));

}

function loadTableData() {
    console.log('-->Va datos de la tabla del panel');

    let url = 'http://127.0.0.1:3333/listDataAdmin';

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {

            console.log(data);

            // let tabla = document.getElementById('idtabla');

            // for (var i = 0; i < data.length; i++) {

            //     tr = tabla.insertRow(-1);

            //     for (var j = 0; j < 6; j++) {
            //         var tabCell = tr.insertCell(-1);
            //         tabCell.innerHTML = data[i][j];
            //     }
            // }

            // EXTRACT VALUE FOR HTML HEADER. 
            // ('Book ID', 'Book Name', 'Category' and 'Price')
            var col = [];
            for (var i = 0; i < data.length; i++) {
                for (var key in data[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }

            // CREATE DYNAMIC TABLE.
            var table = document.createElement("table");
            table.classList.add("pure-table");
            table.classList.add("pure-table-horizontal");

            // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

            var tr = table.insertRow(-1);                   // TABLE ROW.

            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // TABLE HEADER.
                th.innerHTML = col[i];
                tr.appendChild(th);
            }

            // ADD JSON DATA TO THE TABLE AS ROWS.
            for (var i = 0; i < data.length; i++) {

                tr = table.insertRow(-1);

                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = data[i][col[j]];
                }
            }

            // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            divContainer.appendChild(table);

            // removes the ruleToRemove style rule that affects the table
            var style = document.styleSheets[0];
            style.removeRule(0);
            

        })
        .catch(error => console.error('Error: ', error));
}

init();