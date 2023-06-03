const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { userAuth } = require('../../../midllewares/userAuth');

router
    .post('/register', userController.newUserController)
    .get('/:id', userController.getUserController)
    .post('/login', userController.loginController)
    .put('/edit', userAuth, userController.editUserController)
    .put('/editInfo', userAuth, userController.editUserInfoController)
    .delete('/delete', userAuth, userController.deleteUserController);



module.exports = router;
