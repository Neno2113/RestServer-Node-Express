/* 
    Rutas de Usuarios ( Auth )
    host + /api/section 
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { createSection, getSections, updateSection, deleteSection } = require("../controllers/section");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");





const router = Router();


router.post('/',
    [
        check('section', 'The section is mandatory').not().isEmpty(),
        validarCampos,
        validarJWT
    ] 
    , createSection
);

router.get('/', validarJWT, getSections);


router.put('/:id',
    [
        check('section', 'The section is mandatory').not().isEmpty(),
        validarCampos,
        validarJWT
    ], updateSection 

);


router.delete('/:id', validarJWT, deleteSection);







module.exports = router;