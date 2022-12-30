const{Router, json} = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actializarProducto, borraProducto } = require('../controllers/productos');
const { existeCategoriaId, existeProductoId } = require('../helpers/db-validators');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El valor debe ser numerico').not().isEmpty(),
    check('categoria','no es un id valido').isMongoId(),
    check('categoria').custom(existeCategoriaId),
    validarCampos,
],
crearProducto
);

//listar categorias
router.get('/',[
    validarJWT
],obtenerProductos
);

// buscar por id

router.get('/:id',[
    validarJWT,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
],obtenerProducto
);

router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El valor debe ser numerico').not().isEmpty(),
    check('categoria','no es un id valido').isMongoId(),
    check('categoria').custom(existeCategoriaId),
    validarCampos,
],
actializarProducto
);


router.delete('/:id',[
    validarJWT,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
],borraProducto
);

module.exports = router;