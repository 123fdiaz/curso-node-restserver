
const{Router, json} = require('express');
const { check } = require('express-validator');
const { crearCategoria,
     obtenerCategorias, 
     obtenerCategoria, 
     actializarCategoria, 
     borraCategoria } = require('../controllers/categoria');
const { existeCategoriaId } = require('../helpers/db-validators');
const { validarJWT, validarCampos } = require('../middlewares');


const router = Router();

//listar categorias
router.get('/',[
    validarJWT
],obtenerCategorias
);

// buscar por id

router.get('/:id',[
    validarJWT,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
],obtenerCategoria
);

// crear nueva categoria
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria
);

// editar categoria

router.put('/:id',[
    validarJWT,
    check('id','no es un id valido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaId),
    validarCampos
],actializarCategoria
);

// eliminar categoria 
router.delete('/:id',[
    validarJWT,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
],borraCategoria
);





module.exports = router;