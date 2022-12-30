const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const app = express()

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT; 
        this.paths ={
            auth:       '/api/auth',
            usuarios:   '/api/usuarios',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            buscar:     '/api/buscar'
        };     


        this.conectarDB();

    
        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // cors
        this.app.use(cors());
        // lectura y parseo del body
        this.app.use(express.json());
        // directorio publico
        this.app.use( express.static('public'));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.usuarios, require('../routes/user'))
        this.app.use(this.paths.categorias, require('../routes/categoria'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en ', this.port);
        });
    }
}


module.exports =Server;