const { request, response } = require("express");
const { Producto } = require("../models");

const crearProducto = async(req = request, res= response) =>{

 
    const nombre = req.body.nombre.toUpperCase();// se pasa a mayuscula el nombre 
    const productoDB =  await Producto.findOne({nombre})
    const{precio,categoria,descripcion} = req.body;

    if(productoDB) {
        return res.status(401).json({

            msg:'el nombre ya existe '
        });
    }

    const data = {
        nombre,
        precio,
        categoria,
        descripcion,
        usuario: req.usuarioAutenticado._id
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(201).json(producto);
}


const obtenerProductos = async(req, res) => {
    
    const {limite = 5, desde = 0} = req.query;

    const [total,productos] = await Promise.all([
      Producto.countDocuments(),
      Producto.find({estado:true})
              .skip(Number(desde))
              .limit(Number(limite))
              .populate("usuario")// se utilza para hacer un join entre las dos tablas 
              .populate("categoria")
     
    ]);
   
    res.json({
      total,
      productos
    });
  }

  const obtenerProducto = async(req = request, res = response) =>{

    const producto = await Producto.findById(req.params.id).populate("usuario");

    res.json({
        producto
    });

}


const actializarProducto = async( req = request, res = response) =>{

    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();// se pasa a mayuscula el nombre
    data.usuario = req.usuarioAutenticado._id;

    const producto = await Producto.findByIdAndUpdate(id,data,{new : true})

    res.json({
        producto,
      
      });

}

const borraProducto = async(req = request, res = response) =>{
    const {id} = req.params;

    const eliminarProducto = await Producto.findByIdAndUpdate(id,{estado: false},{new:true});

    res.status(200).json(eliminarProducto);
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actializarProducto,
    borraProducto
}