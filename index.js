require('dotenv').config();
const express = require('express');
const  cors = require('cors');
const {dbConnection} = require('./database/config'); 
const path = require('path');
//Crear el servidor de express 
const app = express();

//config cors
app.use( cors() );

//carpeta publica
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

//base de datos
dbConnection(); 

//Rutas
app.use('/api/users', require('./routes/users'));
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/upload', require('./routes/uploads') );

//Lo ultimo
app.get('*', (req, resp) => {
    resp.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.listen(process.env.PORT, ()=>{
    console.log('Run server in port:' + process.env.PORT);
})