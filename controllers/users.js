const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const {generateJWT} = require("../helpers/jwt");

const getUsers = async(req, res) => {
    const users = await User.find({}, 'name email role google');

    res.json({
        ok: true,
        users
    });
}


const createUser = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        const isEmail = await User.findOne({ email });
        if ( isEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const user = new User( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    
    
        // Guardar usuario
        await user.save();

        // Generar el TOKEN - JWT
        const token = await generateJWT( user.id );


        res.json({
            ok: true,
            user,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}

const updateUser = async (req, res = response) => {
    // TODO: Validar token y comprobar si es el usuario correcto
    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );
        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, google, email, ...fields } = req.body;

        if ( usuarioDB.email !== email ) {

            const isEmail = await User.findOne({ email });
            if ( isEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        fields.email = email;
        const UserUpdate = await User.findByIdAndUpdate( uid, fields, { new: true } );

        res.json({
            ok: true,
            usuario: UserUpdate
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const deleteUser = async(req, res = response ) => {

    const uid = req.params.id;
    try {
        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await User.findByIdAndDelete( uid );
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}