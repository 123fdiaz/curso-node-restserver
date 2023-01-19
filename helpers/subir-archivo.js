
const { v4: uuidv4 } = require('uuid');
const path = require('path');


const subirArchivo = (files, extensionesValidas = ['jpg','png'], carpeta = '') => {

    return new Promise ((resolve, reject) => {

        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length -1];
    
        // validar extension 
        if(!extensionesValidas.includes(extension)) {
            return reject('extension no valida')
        }
      
        const nombreTEmporal = uuidv4() + '.' + extension;
    
        uploadPath = path.join(__dirname , '../uploads/',carpeta , nombreTEmporal);  
    
        archivo.mv(uploadPath, (err) => {
          if (err) {
            console.log(err);
                reject(err);
          }
      
          resolve(uploadPath);
        });
    });

}

module.exports =  {
    subirArchivo
}