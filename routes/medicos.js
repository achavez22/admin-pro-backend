/*
    Medicos
    ruta: '/api/medico'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { validateJWT } = require('../middlewares/validate-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
} = require('../controllers/medicos')


const router = Router();

router.get( '/', getMedicos );

router.post( '/',
    [
        validateJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser válido').isMongoId(),
        validateFields
    ],
    crearMedico
);

router.put( '/:id',
    [
        validateJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser válido').isMongoId(),
        validateFields
    ],
    actualizarMedico
);

router.delete( '/:id',
    validateJWT,
    borrarMedico
);

router.get( '/:id',
    validateJWT,
    getMedicoById
);


module.exports = router;



