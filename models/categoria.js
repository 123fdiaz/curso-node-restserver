
const {Schema,model} = require('mongoose');

const categoriaSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'el nombre es obligarorio']
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }  

});

module.exports = model('Categoria', categoriaSchema);