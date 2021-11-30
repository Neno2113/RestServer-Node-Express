/* 
    Rutas de Usuarios ( Auth )
    host + /api/course 
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { createCourse, getCourses, updateCourse, deleteCourse } = require("../controllers/course");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();




router.post('/',
    [
        check('course', 'The course is mandatory').not().isEmpty(),
        check('section', 'The section is mandatory').not().isEmpty(),
        validarCampos,
        validarJWT,
    ], 
    createCourse
);

router.get('/', validarJWT, getCourses);


router.put('/:id',
    [
        check('course', 'The course is mandatory').not().isEmpty(),
        check('section', 'The section is mandatory').not().isEmpty(),
        validarCampos,
        validarJWT,
    ], 
    updateCourse
);

router.delete('/:id', validarJWT, deleteCourse);



module.exports = router