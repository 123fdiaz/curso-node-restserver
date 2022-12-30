const { Categoria,Producto,Role,Usuario } = require('../models');



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

  const existeCategoriaId = async(id) => {

    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria) {

        throw new Error('no existe la categoria con el id seleccionado');

    }
  }

  const existeProductoId = async(id) => {

    const existeProducto = await Producto.findById(id);
    if(!existeProducto) {

        throw new Error('no existe producto con el id seleccionado');

    }
  }

  

  module.exports ={
    esRolValido,
    existeEmail,
    existeUsuarioId,
    existeCategoriaId,
    existeProductoId
  }