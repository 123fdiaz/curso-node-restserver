const { response, request, json } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


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


const googleSingIn = async(req = request, res = response) =>{

    const {id_token} = req.body;

    try {

        const {nombre,img,correo} = await googleVerify(id_token);       

        let usuario = await Usuario.findOne({correo});

        if(!usuario) {
  
            const data = {
                nombre, 
                correo,
                password :':P',
                img,
                google : true

            };

            usuario = new Usuario(data);
            await usuario.save();

        }
        // si existe el usuario verifcamos el estado
        if(!usuario.estado) {

           return  res.status(401).json({
                msg:'usuario bloqueado'
            });
        }

        const token = await generarJWT(usuario.id);

       res.json({
          msg:'Todo ok',
          token,
          usuario
       });
    } catch (error) {
       
        res.status(400).json({
            msg:'no se puede validar token de google'
        });
    }

}
module.exports = {
    login,
    googleSingIn
}