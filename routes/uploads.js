/*
    ruta: api/uploads/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');


const { validateJWT } = require('../middlewares/validate-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use( expressFileUpload() );

router.put('/:tipo/:id', validateJWT , fileUpload );

router.get('/:tipo/:foto', retornaImagen );



module.exports = router;