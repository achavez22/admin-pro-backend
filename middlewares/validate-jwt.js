const jwt = require('jsonwebtoken');
const User = require('../models/user');
const validateJWT = (req, res, next) => {

    // Leer el Token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}

const validateAdminRole = async (req, res, next) =>{
    const uid = req.uid;
   try{

       const userDB = await User.findById(uid);
       if(!userDB){
           return res.status(404).json({
               ok: false,
               msg: 'Usuario no encontrado'
           })
       }

       if(userDB.role !== 'ADMIN_ROLE'){
           return res.status(403).json({
               ok: false,
               msg: 'No tiene privilegios de administrador'
           })
       }

       next();

   }catch (error) {
       res.status(500).json({
           ok: false,
           msg: 'Hablar con el administrador'
       })
   }
}


const validateAdminRoleOrSameUser = async (req, res, next) =>{
    const uid = req.uid;
    const id = req.params.id;

    try{

        const userDB = await User.findById(uid);
        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        if(userDB.role === 'ADMIN_ROLE' || uid === id){
            next();
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios de administrador'
            })
        }



    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hablar con el administrador'
        })
    }
}

module.exports = {
    validateJWT,
    validateAdminRole,
    validateAdminRoleOrSameUser
}