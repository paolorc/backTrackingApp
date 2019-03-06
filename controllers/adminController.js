const model = require("../models/model");

var controller = () => { }

controller.login = (req, res, reqBody) => {

    console.log('-->Se va ingresar al admin..');

    if (!reqBody) {
        throw new Error("Input not valid");
    }

    let data = JSON.parse(reqBody);

    // console.log(data);

    var queryString = `CALL sp_login('${data.p_username}', '${data.p_password}');`;

    var parametros = {
        queryString: queryString
    };

    console.log(parametros.queryString);

    model.login(parametros, function (err, registros) {
        try {
            if (err) {
                console.log("Error: " + err);
                res.writeHead(200, { "Content-Type": "application/json" });
                // res.write(err);
                res.write(JSON.stringify({ "description": "Error: " + err }));
            } else {
                if (registros[0].length > 0) {

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify(registros[0]));

                    console.log('--->Se logueo correctamente.');

                } else {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ "status": "error", "description": "No existe el usuario" }));

                    console.log('--->No existe el usuario.');
                }

                
            }
        } catch (err) {
            res.writeHead(200, { "Content-Type": "application/json" });
            // res.write(err);
            res.write(JSON.stringify({ "description": "Error: " + err }));
            
        }
        res.end();
    });

};

controller.listDataAdmin = (req, res) => {

    console.log("-->Se listara datos de la tabla..");

    var parametros = {
        queryString: "CALL sp_listDataAdmin();"
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
                    console.log('--->Se listo los datos del panel..');

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify(registros[0]));

                    // res.status(200).json({ "status": "success", "Drivers": registros[0] });
                } else {

                    console.log('-->No hay datos que mostrar..');

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ "description": "No hay datos que mostrar" }));
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

controller.listDataHeaderAdmin = (req, res, iduser) => {

    console.log("-->Se listara datos del header del panel..");

    var parametros = {
        queryString: "CALL sp_listDataHeaderAdmin();"
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
                    console.log('--->Se listo los datos del header panel..');

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify(registros[0]));

                    // res.status(200).json({ "status": "success", "Drivers": registros[0] });
                } else {

                    console.log('-->No hay data que mostrar..');

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ "description": "No hay data que mostrar.." }));
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

module.exports = controller;