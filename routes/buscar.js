const{Router, json} = require('express');
const { buscar } = require('../controllers/buscar');

const router = Router();

router.get('/:collections/:termino',buscar);

module.exports = router;