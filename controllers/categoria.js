const { request, response } = require("express");
const { Categoria } = require("../models");



const crearCategoria = async(req = request, res= response) =>{

 
    const nombre = req.body.nombre.toUpperCase();// se pasa a mayuscula el nombre 
    const catagoriaDB =  await  Categoria.findOne({nombre})

    if(catagoriaDB) {
        return res.status(401).json({

            msg:'La categoria ya existe '
        });
    }

    const data = {
        nombre,
        usuario: req.usuarioAutenticado._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);


}

const obtenerCategorias = async(req, res) => {
    
      const {limite = 5, desde = 0} = req.query;
  
      const [total,categorias] = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find({estado:true})
                .skip(Number(desde))
                .limit(Number(limite))
                .populate("usuario")// se utilza para hacer un join entre las dos tablas 
       
      ]);
     
      res.json({
        total,
        categorias
      });
    }

const obtenerCategoria = async(req = request, res = response) =>{

    const catageria = await Categoria.findById(req.params.id).populate("usuario");

    res.json({
        catageria
    });

}

const actializarCategoria = async( req = request, res = response) =>{

    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();// se pasa a mayuscula el nombre
    data.usuario = req.usuarioAutenticado._id;

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new : true})

    res.json({
        categoria,
      
      });

}

const borraCategoria = async(req = request, res = response) =>{
    const {id} = req.params;

    const eliminarCategoria = await Categoria.findByIdAndUpdate(id,{estado: false},{new:true});

    res.status(200).json(eliminarCategoria);
}

module.exports ={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actializarCategoria,
    borraCategoria
}