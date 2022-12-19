const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req, res = response) => {
    
    try {
        const { correo, password } = req.body;

        const usuario = await Usuario.findOne({ correo });
        //Validar si existe el usuario
        if (!usuario) {

            return res.status(400).json({
                msg: 'Usuario o contraseña no validos'
            });
        }

        //validar si esta activo
        if (!usuario.estado) {

            return res.status(400).json({
                msg: 'Usuario o contraseña no validos'
            });
        }

        //validar constraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario o contraseña no validos'
            });
        }

        //generar token

        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: 'Error en autenticacion'
        });

    }
}
module.exports = {
    login
}