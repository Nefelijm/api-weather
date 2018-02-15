// Creamos una variable llamando a la dependencia express
var express = require('express');
// Llamando metodos de express en app
var app = express();
// Escuchando el puerto y la funcion listening
var server = app.listen(3000, listening);

function listening() {
  console.log('Funcionaaaaaaaaaaaa');
}

app.use(express.static('public'));