const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { userAuth } = require('../../../midllewares/userAuth');

router
    .post('/register', userController.newUserController)
    .get('/:id', userController.getUserController)
    .post('/login', userController.loginController)
    .put('/edit', userAuth, userController.editUserController);

module.exports = router;
