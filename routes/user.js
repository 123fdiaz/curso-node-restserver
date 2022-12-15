

const{Router} = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete } = require('../controllers/usuario');
const { esRolValido, existeEmail, existeUsuarioId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/',userGet);

  router.put('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('role').custom(esRolValido),
    validarCampos
  ],userPut);

  router.post('/',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es obligatorio').isLength({min: 6}),
    check('correo', 'el correo no el valido').isEmail(),
    check('correo').custom(existeEmail),
    //check('role', 'no es un role valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(esRolValido),
    validarCampos
  ],userPost);

  router.delete('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
  ],userDelete);





module.exports = router;