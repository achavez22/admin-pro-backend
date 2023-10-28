/*
    Hospitales
    ruta: '/api/hospitales'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales')


const router = Router();

router.get( '/', getHospitales );

router.post( '/',
    [
        validateJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validateFields
    ],
    crearHospital
);

router.put( '/:id',
    [
        validateJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validateFields
    ],
    actualizarHospital
);

router.delete( '/:id',
    validateJWT,
    borrarHospital
);



module.exports = router;
