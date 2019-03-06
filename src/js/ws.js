// Inicializamos conexion por websocket
var SOCKET = null;

SOCKET = io.connect('http://127.0.0.1:3333');

SOCKET.on("connect", function () {
    console.log('conectado');

});

SOCKET.on('socketRowRefresh', (data) => {

    console.log(data);
    let dataTable = data.dataRow;
    let dataHeader = data.dataHeader;
    // console.log(dataHeader);
    
    let promedio_visita = (dataTable.promedio_visita == null)? '':  dataTable.promedio_visita;

    document.getElementById('visitas').innerText = dataHeader.total_visitas;
    document.getElementById('sesiones').innerText = dataHeader.total_visitas_sesiones;
    document.getElementById('clicks').innerText = dataHeader.cant_clicks;
    document.getElementById('permanencia').innerText = dataHeader.total_promedio_visita;

    var row = document.getElementsByTagName('tr');

    let trNew = document.createElement("TR");
    let id = document.createElement('td');
    let path = document.createElement('td');
    let visitas = document.createElement('td');
    let sesiones = document.createElement('td');
    let promedio = document.createElement('td');
    let clicks = document.createElement('td');

    id.appendChild(document.createTextNode(dataTable.idwebpage));
    path.appendChild(document.createTextNode(dataTable.webpage));
    visitas.appendChild(document.createTextNode(dataTable.total_visitas));
    sesiones.appendChild(document.createTextNode(dataTable.total_visitas_sesiones));
    promedio.appendChild(document.createTextNode(promedio_visita));
    clicks.appendChild(document.createTextNode(dataTable.cant_clicks));

    trNew.appendChild(id);
    trNew.appendChild(path);
    trNew.appendChild(visitas);
    trNew.appendChild(sesiones);
    trNew.appendChild(promedio);
    trNew.appendChild(clicks);

    for (i = 1; i < row.length; i++){
        
        if( row[i].cells[0].textContent == dataTable.idwebpage ){
            
            row[i].replaceWith(trNew);

        }
        else if(i>=row.length){
            
                row[i].parentElement.appendChild(trNew);
            
        }

    }

});