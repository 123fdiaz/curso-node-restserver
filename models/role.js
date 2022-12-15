
const {Schema,model} = require('mongoose');

const roleSchema = Schema({

    role: {
        type: String,
        required : [true, 'el role es obligarorio']
    }   

});

module.exports = model('Role', roleSchema);