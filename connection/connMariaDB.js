var Client = require('mariasql');

var c = new Client({
    host: 'localhost',//18.228.121.196  172.16.1.105
    user: 'root',
    password: '',
    port: 3306,
    db: 'mydb'
});

c.on
(
    'error', function(err) {
        console.log('Error de Conexion: ' + err + ' RECONECTED ...');
    }
);

module.exports = {
    //conexion: conexion,
    request: c,
    queryRows: function(sentenciaSQL, useArray){
        c.query(sentenciaSQL, null, { useArray: useArray }, function(err, rows) {
            if (err){
                console.log("Error en query : " + sentenciaSQL);
            }else{
                //response.status(200).json({"status": "success", "registros": rows});
                //return rows;
                //console.log(rows);
                c.close();
                c.end();
            }
        });
    },
    queryExecute: function(sentenciaSQL, useArray){
        c.query(sentenciaSQL, null, { useArray: useArray }, function(err) {
            if (err){
                console.log("Error en query : " + sentenciaSQL);
            }else{
                console.log(rows);
                c.close();
            }
        });
    }
};
