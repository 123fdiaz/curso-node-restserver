
const {Schema,model} = require('mongoose');

const usuarioSchema = Schema({

    nombre: {
        type: String,
        required : [true, 'el nombre es obligarorio']
    },
    correo: {
        type: String,
        required : [true, 'el correo es obligarorio'],
        unique: true
    },
    password: {
        type: String,
        required : [true, 'la contraseña es obligarorio']  
    },

    img: {
        type: String            
    },
    role: {
        type: String,
        required : [true, 'el rol es obligarorio'],
        emun: ['ADMIN_ROLE','USER_ROLE']    
    },
    estado: {
        type: Boolean,
        default : true    
    },

    google: {
        type: Boolean,
        default : false
    }

});

usuarioSchema.methods.toJSON = function() {

    const {__v,password,...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario', usuarioSchema);