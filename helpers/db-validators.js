const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolValido = async(role = '') => {

    const existeRole = await Role.findOne({role});
    if(!existeRole){
      throw new Error('El rol no existe en la bd');
    }
  }

  const existeEmail = async(correo = '') => {

    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail) {

        throw new Error('el correo existe en la bd');

    }
  }

  const existeUsuarioId = async(id) => {

    const existeUser = await Usuario.findById(id);
    if(!existeUser) {

        throw new Error('no existe el usuario');

    }
  }

  

  module.exports ={
    esRolValido,
    existeEmail,
    existeUsuarioId
  }