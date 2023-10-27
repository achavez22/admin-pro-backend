/*
    ruta: api/todo/
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt')

const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');

const router = Router();

router.get('/:busqueda', validateJWT , getTodo );
router.get('/coleccion/:tabla/:busqueda', validateJWT , getDocumentosColeccion );

module.exports = router;