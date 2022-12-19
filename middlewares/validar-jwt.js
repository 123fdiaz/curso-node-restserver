
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

const token = req.header('x-token');
if(!token) {
    return res.status(401).json({
        msg:'no existe token'
    });
}

try {

  const {uuid} =  jwt.verify(token,process.env.SECRETORPRIVATEKEY);

  const usuario = await Usuario.findById(uuid);  

  if(!usuario) {

    res.status(400).json({

        msg:'toekn no valido'
    });
  }

  if(!usuario.estado) {

    res.status(400).json({

        msg:'toekn no valido'
    });
  }

  req.usuarioAutenticado = usuario;
    
  next();
} catch (error) {

    console.log(error);
    res.status(401).json({
        msg:'token no valido'
    });
    
}

}

module.exports = {

    validarJWT
}