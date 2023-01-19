

const{Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, obtenerImagen } = require('../controllers/uploads');
const { coleccionesPerminitas } = require('../helpers');
const { validarArchivoSubir, validarCampos } = require('../middlewares');


const router = Router();

router.post('/',validarArchivoSubir,cargarArchivo);

router.put('/:collection/:id',[
    validarArchivoSubir,
    check('id','no es un id valido').isMongoId(),
    check('collection').custom(c => coleccionesPerminitas(c, ['usuarios','productos'])),
    validarCampos
],actualizarImagen);

router.get('/:collection/:id',[
    check('id','no es un id valido').isMongoId(),
    check('collection').custom(c => coleccionesPerminitas(c, ['usuarios','productos'])),
    validarCampos
],obtenerImagen)

module.exports = router;