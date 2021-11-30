const { response } = require("express");
const Student = require("../models/Student");




const createStudent = async( req, res = response ) => {

    const { email } = req.body;

    try {

        let student = await Student.findOne({ email });

        if( student ){
            return res.status(400).json({
                ok: false, 
                msg: 'El estudiante ya existe!!'
            })
        }

        student = await new Student( req.body );

        await student.save();

        return res.status(201).json({
            ok: true,
            student
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}


const getStudents = async( req, res = response ) => {

    const students = await Student.find()
                                .populate('section');

    return res.json({
        ok: true,
        students
    })

};

const updateStudent = async( req, res = response ) => {

    const { id } = req.params;

    try {

        const student = await Student.findById( id );

        if(!student){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro el estudiante'
            })
        }

        const updateStudent = req.body;

        const studentUpdated = await Student.findByIdAndUpdate(id, updateStudent, { new: true });

        return res.status(200).json({
            ok: true, 
            student: studentUpdated
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Hable con el administrador'
        })
    }

};


const deleteStudent = async( req, res = response ) => {

    const { id } = req.params;

    try {

        const student = await Student.findById( id );

        if( !student ){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro el estudiante'
            })
        };


        const studentDeleted = await Student.findByIdAndDelete( id );

        return res.json({
            ok: true,
            student: studentDeleted
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Hable con el administrador'
        })
    }


}



module.exports = {
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent
}