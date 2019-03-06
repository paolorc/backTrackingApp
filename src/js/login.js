
function login() {

    console.log('-->Se va ingresar al administrador..');

    let url = 'http://127.0.0.1:3333/admin/login';
    let sendData = {}
    let dataAdmin = {}

    sendData = {
        "p_username": document.getElementById("username").value,
        "p_password": document.getElementById("password").value
    }

    console.log(sendData);
    

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(sendData), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            console.log(data);

            if(data.status == 'error'){

                alert(data.description);
                document.getElementById("username").value = '';
                document.getElementById("password").value = '';
                return;
            }

            dataAdmin.iduser = data[0].iduser;
            dataAdmin.name = data[0].name;
            dataAdmin.idtracking = data[0].tracking_id;

            // Renderizar los datos

            window.localStorage.setItem('dataAdmin', JSON.stringify(dataAdmin));
            console.log('-->Se logeo correctamente');

            window.location = "http://127.0.0.1:3333/panel.html";


        })
        .catch(error => console.error('Error: ', error));

}