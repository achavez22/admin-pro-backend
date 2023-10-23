require('dotenv').config();
const express = require('express');
const  cors = require('cors');
const {dbConnection} = require('./database/config'); 

//Crear el servidor de express 
const app = express();

//config cors
app.use( cors() );

//base de datos
dbConnection(); 

//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msj: 'hello world',
    })
});


app.listen(process.env.PORT, ()=>{
    console.log('Run server ' + process.env.PORT);
})