var conn = require("../connection/connMariaDB");

var model = function(){};

model.login = function(parametros, cb){
    
    conn.request.query(parametros.queryString, null, { useArray: false }, cb);
}

model.requestData = function(parametros, cb){
    console.log(parametros.queryString);
    conn.request.query(parametros.queryString, null, { useArray: false }, cb);
}
//Generico para insercion de data
model.insertData = function(parametros, cb){
    // console.log(parametros.queryString);
    conn.request.query(parametros.queryString, null, { useArray: false }, cb);
}

//Generico para actualizar data
model.updateData = function(parametros, cb){
    // console.log(parametros.queryString);
    conn.request.query(parametros.queryString, null, { useArray: false }, cb);
}

//Generico Lista de data
model.listData = function(parametros, cb){
    // console.log(parametros.queryString);
    conn.request.query(parametros.queryString, null, { useArray: false }, cb);
}

module.exports = model;