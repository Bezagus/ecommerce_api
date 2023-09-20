const { Router } = require('express');
const users = require('./users')

function routersApp(app){
    const router = Router();
    app.use('/api/v1', router)

    router.use('/user',users)
}


module.exports = routersApp;
 