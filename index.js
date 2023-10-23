require('dotenv').config();
const express = require('express');
const  cors = require('cors');
const {dbConnection} = require('./database/config'); 

//Crear el servidor de express 
const app = express();

//config cors
app.use( cors() );

//lectura y parseo del body
app.use(express.json());

//base de datos
dbConnection(); 

//Rutas
app.use('/api/users', require('./routes/users'));
app.use( '/api/login', require('./routes/auth') );

app.listen(process.env.PORT, ()=>{
    console.log('Run server in port:' + process.env.PORT);
})