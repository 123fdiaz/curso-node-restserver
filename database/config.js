const mongoose = require('mongoose');

const  dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            keepAlive: true,
            useNewUrlParser: true,
            strictQuery: false//,
            /*useUnifiedTopoLogy: true*//*,
            useCreateIndex: true,
            useFindAndModify: false*/

        });

        console.log('Base de datos en linea');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error inciando base de datos');
    }

}

module.exports = {
    dbConnection
}
