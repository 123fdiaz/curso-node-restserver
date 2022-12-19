const{Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('password', 'la contraseña es obligatorio2').not().isEmpty(),
    check('correo', 'el correo no el valido').isEmail(),
    validarCampos
],login);


module.exports = router;