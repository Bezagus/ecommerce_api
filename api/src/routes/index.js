const { Router } = require('express');
const users = require('./users')


const router = Router();

router.use('/user', users)


module.exports = router;
 