
const{response} = require('express');

const Usuario = require('../models/usuario');

const bcryptjs = require('bcryptjs');


const res = response;

const userGet = async(req, res) => {

    const {limite = 5, desde = 0} = req.query;

    const [total,usuarios] = await Promise.all([
       Usuario.countDocuments({estado:true}),
       Usuario.find({estado:true})
              .skip(Number(desde))
              .limit(Number(limite))
     
    ]);
    res.json({
      total,
      usuarios
    });
  }

  const userPut = async(req, res) => {
    const id = req.params.id;

    const {_id, password, google, correo, ...resto} = req.body;

    //TODO validar contra base de datos

    if(password){
      
      //encriptar la constraseña
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
      usuario
    });
  }

  const userPost = async (req, res) => {

    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({nombre, correo, password, role});

    //encriptar la constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    usuario.save();

    res.json({
      usuario
    });
  }

  const userDelete = async(req, res) => {

     const id = req.params.id;
     const usuario = await  Usuario.findByIdAndUpdate(id,{estado:false})
    res.json({
      usuario
    });
  }

  module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
  }