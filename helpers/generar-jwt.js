
const jwt = require('jsonwebtoken');

const generarJWT = ( uuid = '') =>  {

    return new Promise((resolve, reject) => {

        const payload = {uuid};
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:'30m'
        }, (err, token) => {

            if(err) {
                console.log(err);
                reject('no se puedo generar token');
            }else{
                resolve(token);
            }
        });
    });
}


module.exports = {
    generarJWT
}; 