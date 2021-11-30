/* 
    Rutas de Usuarios ( Auth )
    host + /api/auth 
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();

router.post('/new',
    [//middlware
        check('name', 'The name is mandatory').not().isEmpty(),
        check('email', 'The email is mandatory').isEmail().normalizeEmail(),
        check('password', 'The password must have 6 characters').isLength({ min:6 }),
        validarCampos
    ],
    createUser
);

router.post('/',
    [//middlware
        check('email', 'The email is mandatory').isEmail().normalizeEmail(),
        check('password', 'The password must have 6 characters').isLength({ min:6 }),
        validarCampos
    ],
    loginUser
);


router.get('/renew', validarJWT, renewToken );



module.exports = router;