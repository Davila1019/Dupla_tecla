const rateLimit = require('express-rate-limit');


const corsOption = {
    origin : function (origin, callback) {
        callback(null, true)
        
        if (process.env.listaBlanca.indexOf(origin) !== -1){
            callback(null, true)
        }else {
            callback(new Error('No autorizado por Cors'))
        }
    }
}

log = function (req,res,next) {
    const {method,path,query,body} = req;
    console.log(`${method} - ${path} - ${JSON.stringify(query)} - ${JSON.stringify(body)}`);
    next()
}

Autenticar = function (req,res,next) {
    const {nombre,codigo,clave} = req.body;
    if(clave == "Una clave para protegernos a todos"){
        return next()
    }
    else{
        return res.status(400).json("No dijiste la palabra mágica")
    }
}

const limitador = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 20, // Limite de peticiones
    message: 'Limite de solicitudes exedido'
})

module.exports = {limitador, Autenticar, log, corsOption}