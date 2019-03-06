const model = require("../models/model");
const jwt = require('jsonwebtoken');

var controller = () => { }

controller.listSessionData = (req, res, iduser) => {

    console.log("-->Se listara datos de la session..");

    var parametros = {
        queryString: "CALL sp_listSessionData(" + iduser + ");"
    };

    model.listData(parametros, function (err, registros) {
        try {
            if (err) {
                console.log("Error: " + err);
                res.writeHead(200, { "Content-Type": "application/json" });
                // res.write(err);
                res.write(JSON.stringify({ "description": "Error: " + err }));
                // res.status(200).json({ "status": "error", "queryString": parametros.queryString, "description": err.message });
            } else {
                if (registros[0].length > 0) {
                    console.log('--->Se listo los datos de session..');

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify(registros[0]));

                    // res.status(200).json({ "status": "success", "Drivers": registros[0] });
                } else {

                    console.log('-->No esta registrado en el sistema de Tracking..');

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ "description": "Upss, no esta registrado.." }));
                    // res.status(200).json({ "status": "sinDatos" });
                }
            }
        } catch (err) {

            res.writeHead(200, { "Content-Type": "application/json" });
            // res.write(err);
            res.write(JSON.stringify({ "description": "Error: " + err }));

            // res.status(200).json({ "status": "error", "queryString": parametros.queryString, "description": err });
        }

        res.end();
    });
}

controller.userExist = (req, res, iduser) => {

    console.log("-->Se va validar que exista el usuario en el sistema..");
    console.log(iduser);

    if (iduser == '') {
        res.writeHead(200, { "Content-Type": "application/json" });
        // res.write(err);
        res.write(JSON.stringify({ "description": "No existe el id de usuario para hacer el Tracking.." }));
        res.end();
    }

    var parametros = {
        queryString: "CALL sp_validateUser(" + iduser + ");"
    };

    model.listData(parametros, function (err, registros) {
        try {
            if (err) {
                console.log("Error: " + err);
                res.writeHead(200, { "Content-Type": "application/json" });
                // res.write(err);
                res.write(JSON.stringify({ "description": "Error: " + err }));
                // res.status(200).json({ "status": "error", "queryString": parametros.queryString, "description": err.message });
            } else {
                if (registros[0].length > 0) {

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify(registros[0]));

                    // res.status(200).json({ "status": "success", "Drivers": registros[0] });
                } else {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ "description": "Sin datos" }));
                    // res.status(200).json({ "status": "sinDatos" });
                }
            }
        } catch (err) {

            res.writeHead(200, { "Content-Type": "application/json" });
            // res.write(err);
            res.write(JSON.stringify({ "description": "Error: " + err }));

            // res.status(200).json({ "status": "error", "queryString": parametros.queryString, "description": err });
        }

        res.end();
    });
}

controller.insertSessionVisit = (req, res, reqBody) => {
    console.log('-->Se va registrar una nueva session..');

    if (!reqBody) {
        throw new Error("Input not valid");
    }

    let data = JSON.parse(reqBody);

    console.log(data);

    var queryString = `CALL sp_insertSessionVisit(${data.p_iduser}, '${data.p_pathname}', '${data.p_timeStart}');`;

    var parametros = {
        queryString: queryString
    };

    console.log(parametros.queryString);

    model.insertData(parametros, function (err, registros) {
        try {
            if (err) {
                console.log("Error: " + err);
                res.writeHead(200, { "Content-Type": "application/json" });
                // res.write(err);
                res.write(JSON.stringify({ "description": "Error: " + err }));

                // console.log("Error: " + err);
                // res.status(200).json({ "status": "error", "queryString": parametros.queryString, "description": err });
            } else {

                console.log('--->Se ingreso una nueva pagina visitada.');

                if (registros[0].length > 0) {

                    console.log('-->Se registro una visita nueva..');

                    controller.socketRowRefresh(res.io, registros[0][0].idwebpage);

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify(registros[0]));

                    // res.status(200).json({ "status": "success", "Drivers": registros[0] });
                } else {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ "description": "No devolvio datos desde la DB." }));
                    // res.status(200).json({ "status": "sinDatos" });
                }

                // res.io.emit('finishTripEvent', registros[0]);
                // console.log("-->(Device Driver): Se termino un viaje..")
                // res.status(200).json({ "status": "success" });
            }
        } catch (err) {

            res.writeHead(200, { "Content-Type": "application/json" });
            // res.write(err);
            res.write(JSON.stringify({ "description": "Error: " + err }));
            // res.status(200).json({ "status": "error", "queryString": parametros.queryString, "description": err });
        }

        res.end();
    });
}

controller.insertWebpageVisit = (req, res, reqBody) => {
    console.log('-->Se va actualizar las sesion..');

    if (!reqBody) {
        throw new Error("Input not valid");
    }

    let data = JSON.parse(reqBody);

    console.log(data);

    var queryString = `CALL sp_insertWebpageVisit(${data.p_iduser}, ${data.p_idtracking_session}, '${data.p_pathname}', '${data.p_timeStart}');`;

    var parametros = {
        queryString: queryString
    };

    console.log(parametros.queryString);

    model.insertData(parametros, function (err, registros) {
        try {
            if (err) {
                console.log("Error: " + err);
                res.writeHead(200, { "Content-Type": "application/json" });
                // res.write(err);
                res.write(JSON.stringify({ "description": "Error: " + err }));

                // console.log("Error: " + err);
                // res.status(200).json({ "status": "error", "queryString": parametros.queryString, "description": err });
            } else {

                if (registros[0].length > 0) {

                    console.log('-->Se registro una visita nueva..');


                    controller.socketRowRefresh(res.io, registros[0][0].idwebpage);

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify(registros[0]));

                    // res.status(200).json({ "status": "success", "Drivers": registros[0] });
                } else {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ "description": "No devolvio datos desde la DB." }));
                    // res.status(200).json({ "status": "sinDatos" });
                }

                console.log('--->Se ingreso una nueva pagina visitada.');

                // res.io.emit('finishTripEvent', registros[0]);
                // console.log("-->(Device Driver): Se termino un viaje..")
                // res.status(200).json({ "status": "success" });
            }
        } catch (err) {

            res.writeHead(200, { "Content-Type": "application/json" });
            // res.write(err);
            res.write(JSON.stringify({ "description": "Error: " + err }));
            // res.status(200).json({ "status": "error", "queryString": parametros.queryString, "description": err });
        }

        res.end();
    });
}

controller.updateTimeOnPage = (req, res, reqBody) => {
    console.log('-->Se va actualizar el Time On Page..');

    if (!reqBody) {
        throw new Error("Input not valid");
    }

    let data = JSON.parse(reqBody);

    console.log(data);

    var queryString = `CALL sp_updateTimeOnPage(${data.p_idwebpage_visit}, '${data.p_timeEnd}');`;

    var parametros = {
        queryString: queryString
    };

    console.log(parametros.queryString);

    model.insertData(parametros, function (err, registros) {
        try {
            if (err) {
                console.log("Error: " + err);
                res.writeHead(200, { "Content-Type": "application/json" });
                // res.write(err);
                res.write(JSON.stringify({ "description": "Error: " + err }));

                // console.log("Error: " + err);
                // res.status(200).json({ "status": "error", "queryString": parametros.queryString, "description": err });
            } else {

                console.log('--->Se actualizo el Time On Page..');

                controller.socketRowRefresh(res.io, data.p_idwebpage);

                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ "description": "Se ingresaron los datos." }));

            }
        } catch (err) {

            res.writeHead(200, { "Content-Type": "application/json" });
            // res.write(err);
            res.write(JSON.stringify({ "description": "Error: " + err }));
            // res.status(200).json({ "status": "error", "queryString": parametros.queryString, "description": err });
        }

        res.end();
    });
}

controller.insertLinkClicked = (req, res, reqBody) => {
    console.log('-->Se va registrar un linkClicked a en una pagina visitada..');

    if (!reqBody) {
        throw new Error("Input not valid");
    }

    console.log(reqBody);

    let data = JSON.parse(reqBody);

    var queryString = `CALL sp_insertLinkClicked(${data.p_idwebpage});`;

    var parametros = {
        queryString: queryString
    };

    console.log(parametros.queryString);

    model.insertData(parametros, function (err, registros) {
        try {
            if (err) {
                console.log("Error: " + err);
                res.writeHead(500, { "Content-Type": "application/json" });
                // res.write(err);
                res.write(JSON.stringify({ "description": "Error: " + err }));

            } else {

                console.log('--->Se ingreso un nuevo click..');

                controller.socketRowRefresh(res.io, data.p_idwebpage);

                res.writeHead(200, { "Content-Type": "application/json" });
                res.write(JSON.stringify({ "description": "Se ingresaron los datos." }));

            }
        } catch (err) {

            res.writeHead(200, { "Content-Type": "application/json" });
            // res.write(err);
            res.write(JSON.stringify({ "description": "Error: " + err }));
            // res.status(200).json({ "status": "error", "queryString": parametros.queryString, "description": err });
        }

        res.end();
    });
}

controller.socketRowRefresh = (socket, idwebpage) => {
    console.log('-->Se va enviar el socket');

    console.log(idwebpage);


    var queryString = `CALL sp_socketRowRefresh(${idwebpage});`;
    var queryString2 = `CALL sp_listDataHeaderAdmin();`;

    var parametros = {
        queryString: queryString
    };
    var parametros2 = {
        queryString: queryString2
    };

    console.log(parametros.queryString);

    model.listData(parametros, function (err, registros) {
        try {
            if (err) {
                console.log("Error: " + err);

            } else {

                console.log('--->Se obtuvo la data para el socket');

                // se va enviar un socket con la data
                let dataSend = {}
                dataSend.dataRow = registros[0][0];

                // Segunda consulta para header data
                model.listData(parametros2, function (err, registros) {
                    try {
                        if (err) {
                            console.log("Error: " + err);

                        } else {

                            console.log('--->Se obtuvo la data para el socket Header');

                            // se va enviar un socket con la data

                            dataSend.dataHeader = registros[0][0];
                            socket.emit('socketRowRefresh', dataSend);

                        }
                    } catch (err) {

                        console.log("Error: " + err);
                        // res.status(200).json({ "status": "error", "queryString": parametros.queryString, "description": err });
                    }

                });

            }
        } catch (err) {

            console.log("Error: " + err);
            // res.status(200).json({ "status": "error", "queryString": parametros.queryString, "description": err });
        }

    });
}


module.exports = controller;

