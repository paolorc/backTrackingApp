

function sessionData(trackingid) {

    jQuery.ajaxSetup({ async: false });
    console.log('-->Va cargar session data');

    let url = 'http://127.0.0.1:3333/getSessionData/' + trackingid;

    // Con fetch sin jquery
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            console.log(data);

            let dataLS = {}

            let dataUser = JSON.parse(window.localStorage.getItem('dataLS'))

            if (!dataUser) {

                dataLS.iduser = data[0].iduser;
                dataLS.idwebpage = "";
                dataLS.tracking_id = data[0].tracking_id;
                dataLS.idwebpage_visit = "";
                dataLS.idtracking_session = "";

                window.localStorage.setItem('dataLS', JSON.stringify(dataLS));

            }
            else {

                dataUser.iduser = data[0].iduser;
                dataUser.tracking_id = data[0].tracking_id;

                window.localStorage.setItem('dataLS', JSON.stringify(dataUser));

            }

            sessionInsert();
        })
        .catch(error => console.error('Error: ', error));

    // $.get(url, function (data, status) {

    //     if (status == 'success' && data.length > 0) {

    //         let dataLS = {}

    //         let dataUser = JSON.parse(window.localStorage.getItem('dataLS'))

    //         if (!dataUser) {

    //             dataLS.iduser = data[0].iduser;
    //             dataLS.idwebpage = "";
    //             dataLS.tracking_id = data[0].tracking_id;
    //             dataLS.idwebpage_visit = "";
    //             dataLS.idtracking_session = "";

    //             window.localStorage.setItem('dataLS', JSON.stringify(dataLS));

    //         }
    //         else {

    //             dataUser.iduser = data[0].iduser;
    //             dataUser.tracking_id = data[0].tracking_id;

    //             window.localStorage.setItem('dataLS', JSON.stringify(dataUser));

    //         }

    //         sessionInsert();

    //     }
    //     else {
    //         console.log('Upss, El tracking_id no se encuentra registrado..');

    //     }

    // });
}

function sessionInsert() {

    let date = new Date();
    let pathname = window.location.pathname;

    let dataLS = {}
    dataLS = JSON.parse(window.localStorage.getItem('dataLS'));

    if (!dataLS.idtracking_session) {

        let sendData = {}
        let url = 'http://127.0.0.1:3333/insertSessionVisit';

        sendData = {
            "p_iduser": dataLS.iduser,
            "p_pathname": `${pathname}`,
            "p_timeStart": `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }

        // Con fetch sin jquery
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(sendData), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);

                dataLS.idwebpage = data[0].idwebpage;
                dataLS.idtracking_session = data[0].idsession;
                dataLS.idwebpage_visit = data[0].idwebpage_visit;

                window.localStorage.setItem('dataLS', JSON.stringify(dataLS));
                console.log('-->Se registro la session');

                setInterval(updateTimeOnPage, 5000);
                insertLinkClicked();
            })
            .catch(error => console.error('Error: ', error));

        // $.post(url,
        //     JSON.stringify(sendData),
        //     function (data, status) {

        //         if (status == 'success' && data.length > 0) {

        //             dataLS.idwebpage = data[0].idwebpage;
        //             dataLS.idtracking_session = data[0].idsession;
        //             dataLS.idwebpage_visit = data[0].idwebpage_visit;

        //             window.localStorage.setItem('dataLS', JSON.stringify(dataLS));
        //             console.log('-->Se registro la session');

        //         }
        //         else {
        //             console.log('Upss, no se ha podido registrar bien los datos de la nueva session..');
        //         }

        //     });

    }
    else {

        let sendData = {}
        let url = 'http://127.0.0.1:3333/insertWebpageVisit';

        sendData = {
            "p_iduser": dataLS.iduser,
            "p_idtracking_session": dataLS.idtracking_session,
            "p_pathname": `${pathname}`,
            "p_timeStart": `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }

        // Con fetch sin jquery
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(sendData), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);

                dataLS.idwebpage = data[0].idwebpage;
                dataLS.idtracking_session = data[0].idsession;
                dataLS.idwebpage_visit = data[0].idwebpage_visit;

                window.localStorage.setItem('dataLS', JSON.stringify(dataLS));
                console.log('-->Se actualizo la session');

                setInterval(updateTimeOnPage, 5000);
                insertLinkClicked();
            })
            .catch(error => console.error('Error: ', error));

        // $.post(url,
        //     JSON.stringify(sendData),
        //     function (data, status) {

        //         if (status == 'success' && data.length > 0) {

        //             dataLS.idwebpage = data[0].idwebpage;
        //             dataLS.idtracking_session = data[0].idsession;
        //             dataLS.idwebpage_visit = data[0].idwebpage_visit;

        //             window.localStorage.setItem('dataLS', JSON.stringify(dataLS));
        //             console.log('-->Se actualizo la session');

        //         }
        //         else {
        //             console.log('Upss, no se ha podido actualizar bien los datos de la session..');
        //         }

        //     });

    }

}

function updateTimeOnPage() {

    let date = new Date();
    let url = 'http://127.0.0.1:3333/updateTimeOnPage';

    let dataLS = {}
    dataLS = JSON.parse(window.localStorage.getItem('dataLS'));

    let sendData = {}

    sendData = {
        "p_timeEnd": `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        "p_idwebpage_visit": dataLS.idwebpage_visit,
        "p_idwebpage": dataLS.idwebpage
    }

    // Con fetch sin jquery
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(sendData), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            console.log(data);

            console.log('-->Se actualizo el timeOnPage');
        })
        .catch(error => console.error('Error: ', error));


    // Con jquery
    // $.post(url,
    //     JSON.stringify(sendData),
    //     function (data, status) {

    //         if (status == 'success') {

    //             console.log('-->Se actualizo el timeOnPage');

    //         }
    //         else {
    //             console.log('Upss, no se ha podido actualizar bien los datos de la session..');
    //         }

    //     });

}

function insertLinkClicked() {

    var href = document.getElementsByTagName('a');
    console.log(href);

    for (i = 0; i < href.length; i++){

        if(href[i].href.length > 5){
            href[i].onclick = insertEventClick; //agrego evento a los enlaces
        }
        
        
    }
        

    function insertEventClick() {

        let url = 'http://127.0.0.1:3333/webpage/linkclicked';
        let dataLS = {}
        dataLS = JSON.parse(window.localStorage.getItem('dataLS'));

        let sendData = {}

        sendData = {
            "p_idwebpage": dataLS.idwebpage
        }

        // Con fetch sin jquery
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(sendData), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => console.log('Success: Se ingreso un nuevo click..'))
            .catch(error => console.error('Error: ', error));

        // con jquery

        // $.post(url,
        //     JSON.stringify(sendData),
        //     function (data, status) {

        //         if (status == 'success') {

        //             console.log('-->Se ingreso un nuevo click..');

        //         }
        //         else {
        //             console.log('Upss, no se ha podido ingresar un click en la web..');
        //         }

        //     });

    }



}
