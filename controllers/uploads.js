const { request, response } = require("express");
const  fs = require("fs");
const { subirArchivo } = require("../helpers");
const {Usuario, Producto} = require("../models")
const path = require('path');

const cargarArchivo = async(req = request, res = response) => { 


    try {
        const pathCompleto = await subirArchivo(req.files,['png']);

        res.status(200).json({
        msg:'Archivo cargado'
       });
    } catch (error) {
     
        res.status(400).json({
            error
        });
    }

}

const actualizarImagen = async(req = request, res = response) =>{

    const {id, collection} = req.params;

    let modelo;
    switch (collection) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: 'no existe usuarios con este id'
                });
            }

            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: 'no existe Productos con este id'
                });
            }

            break;
    
        default:
            return res.status(500).json({
                msg: 'se me olvido esta parte de codigo'
            })
          
    }

    //limpiar imagen del servidor
    if(modelo.img){
        // ruta de la  imagen actual
        const pathActual = path.join(__dirname,'../uploads/',collection,modelo.img);        
    
        // verificamos si existe la imagen
        if(fs.existsSync(pathActual)) {

            fs.unlinkSync(pathActual);
        }
    }
    const pathCompleto = await subirArchivo(req.files,undefined,collection);
    modelo.img = pathCompleto;

    modelo.save();

    res.status(200).json({
        msg:'imagen actualizada correctamente'
    });

}

const obtenerImagen = async(req = request, res = response) =>{

    const {id, collection} = req.params;

    let modelo;
    switch (collection) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: 'no existe usuarios con este id'
                });
            }

            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg: 'no existe Productos con este id'
                });
            }

            break;
    
        default:
            return res.status(500).json({
                msg: 'se me olvido esta parte de codigo'
            })
          
    }

    //limpiar imagen del servidor
    if(modelo.img){
        // ruta de la  imagen actual
        const pathActual = path.join(__dirname,'../uploads/',collection,modelo.img);        
    
        // verificamos si existe la imagen
        if(fs.existsSync(pathActual)) {

            // se regresa la imagen
           return res.status(200).sendFile(pathActual);

      
        }
    }
    //imgen por defecto no-image.jpg
    const pathDefecto = path.join(__dirname,'../assets/','no-image.jpg');

    res.status(200).sendFile(pathDefecto);

}

module.exports = {

    cargarArchivo,
    actualizarImagen,
    obtenerImagen
}