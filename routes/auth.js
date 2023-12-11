const express = require('express')
const router = express.Router()
const { check } = require('express-validator');
const AuthController = require('../controllers/AuthController')
const { validFields } = require('../middleware/valid-fields');

router.post('/register',
[
    check('Username', 'Username required').not().isEmpty(),
    check('Email', 'Email required').not().isEmpty(),
    check('Email', 'Email invalid').isEmail(),
    check('Password', 'Password required').not().isEmpty(),
    validFields
]
, AuthController.register)
router.post('/login',
[
    check('Username', 'Username required').not().isEmpty(),
    check('Password', 'Password required').not().isEmpty(),
    validFields
], AuthController.login)
router.post('/refresh-token',
[
    check('refreshToken', 'refreshToken required').not().isEmpty(),
    validFields
],AuthController.refreshToken)


module.exports = router







