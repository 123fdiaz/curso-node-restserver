const { request, response, json } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const {ObjectId} = require('mongoose').Types;


const  coleccionesPermitidas = [

    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuario = async(termino= '', res= response) => {

    const esIdMongo = ObjectId.isValid(termino);
    if(esIdMongo){

        const usuario = await Usuario.findById(esIdMongo);

       return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    
    // expresion regular para buscar el termino insensible a mayusculas y minusculas
    const regx = new RegExp(termino , 'i');

    // este se utiliza para buscar por dos parametros 
    const usuarios = await Usuario.find({
        $or:[{nombre: regx},{correo: regx}], // esto significa que si es igual a cualquiera de las dos condiciones
        $and:[{estado:true}]
    });
    res.json({
        results: usuarios
    });
}


const buscarcategoria = async(termino= '', res= response) => {

    const esIdMongo = ObjectId.isValid(termino);
    if(esIdMongo){

        const categoria = await Categoria.findById(esIdMongo);

       return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    
    // expresion regular para buscar el termino insensible a mayusculas y minusculas
    const regx = new RegExp(termino , 'i');

    // este se utiliza para buscar por dos parametros 
    const categorias = await Categoria.find({
        $or:[{nombre: regx}], // esto significa que si es igual a cualquiera de las dos condiciones
        $and:[{estado:true}]
    });
    res.json({
        results: categorias
    });
}


const buscarProducto = async(termino= '', res= response) => {

    const esIdMongo = ObjectId.isValid(termino);
    if(esIdMongo){

        const producto = await Producto.findById(esIdMongo);

       return res.json({
            results: (producto) ? [producto] : []
        });
    }

    
    // expresion regular para buscar el termino insensible a mayusculas y minusculas
    const regx = new RegExp(termino , 'i');

    // este se utiliza para buscar por dos parametros 
    const productos = await Producto.find({
        $or:[{nombre: regx}], // esto significa que si es igual a cualquiera de las dos condiciones
        $and:[{estado:true}]
    });
    res.json({
        results: productos
    });
}

const buscar = async(req = request, res = response) => {

    const {collections,termino} = req.params;

    if(!coleccionesPermitidas.includes(collections)) {
        return res.status(400).json({
            msg:'la colleciion enviada no es valida'
        });
    };

    switch (key) {
        case 'usuarios':

            buscarUsuario(termino, res);
        break;

        case 'categorias':

            buscarcategoria(termino, res);

            break;

        case 'productos':

            buscarProducto(termino, res);
            break;
        default:
            res.status(500).json({
                msg:'error en el servidor'
            })
            break;
    }

}

module.exports = {
    buscar
}