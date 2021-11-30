/* 
    Rutas de Usuarios ( Auth )
    host + /api/student 
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { createStudent, getStudents, updateStudent, deleteStudent } = require("../controllers/student");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { route } = require("./course");



const router = Router();




router.post('/', 
    [
        check('name', 'The Name is mandatory').not().isEmpty(),
        check('surname', 'The Surname is mandatory').not().isEmpty(),
        check('email', 'The Email is mandatory and real email').isEmail().normalizeEmail(),
        check('section', 'The Section is mandatory').not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    createStudent
);


router.get('/', validarJWT, getStudents );

router.put('/:id', 
    [
        check('name', 'The Name is mandatory').not().isEmpty(),
        check('surname', 'The Surname is mandatory').not().isEmpty(),
        check('email', 'The Email is mandatory and real email').isEmail().normalizeEmail(),
        check('section', 'The Section is mandatory').not().isEmpty(),
        validarCampos,
        validarJWT
    ],
    updateStudent
);

router.delete('/:id', validarJWT, deleteStudent );




module.exports = router;