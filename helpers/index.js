

const  dbvaidators  = require('./db-validators');
const  generaJWT  = require('./generar-jwt');
const  googleVerifique = require('./google-verify');
const  subirArchivo = require('./subir-archivo');
module.exports={

    ...dbvaidators,
    ...generaJWT,
    ...googleVerifique,
    ...subirArchivo,
}