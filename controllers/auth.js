const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const {getMenuFrontend} = require("../helpers/menu-frontend");


const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const userDB = await User.findOne({ email });

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generateJWT( userDB.id );


        res.json({
            ok: true,
            token,
            menu: getMenuFrontend(userDB.role)
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const googleSignIn = async( req, res = response ) => {
    try {
        const { email, name, picture } = await googleVerify( req.body.token );

        const userDB = await User.findOne({ email });
        let user;

        if ( !userDB ) {
            user = new User({
                name: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            user = userDB;
            user.google = true;
            // usuario.password = '@@';
        }

        // Guardar Usuario
        await user.save();

        // Generar el TOKEN - JWT

        const token = await generateJWT( user.id );


        res.json({
            ok: true,
            email, name, picture,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        });
    }
}



const renewToken = async(req, res = response) => {

    const uid = req.uid;
    // Generar el TOKEN - JWT
    const token = await generateJWT( uid );
    const usuario = await  User.findById(uid);

    res.json({
        ok: true,
        token,
        usuario
    });

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}
