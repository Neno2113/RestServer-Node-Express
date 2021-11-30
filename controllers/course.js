const { response } = require("express");
const Course = require('../models/Course');


const createCourse = async( req, res = response ) => {

    const { course } = req.body;

    try {
        
        const courseValid = await Course.findOne({ course });

        if( courseValid ) {
            return res.status(400).json({
                ok: false,
                msg: 'Course already exists!!'
            })
        } 

        const newCourse = new Course( req.body );
        
        await newCourse.save();

        return res.status(201).json({
            ok: true, 
            course: newCourse
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador del sistema'
        })
    }
}


const getCourses = async(req, res = response ) => {

    const courses = await Course.find()
                                .populate('section', 'section');

    return res.json({
        ok: true, 
        courses
    })

} 


const updateCourse = async( req, res = response ) => {

    const { id } = req.params;

    const { course } = req.body;

    try {
        const courseValid = await Course.findOne({ course: course });

        // console.log(courseValid.id);
        // console.log(id);

        if(courseValid){
            if(courseValid.id != id){
                return res.status(404).json({
                    ok: false, 
                    msg: 'EL curso digitado no puede ser igual a uno ya creado.'
                })
            } else {
                const courseCheck = await Course.findById( id );
        
                if( !courseCheck ){
                    return res.status(404).json({
                        ok: false, 
                        msg: 'No se encontro el curso'
                    })
                }

                const newCourse = req.body;

                const updatedCourse = await Course.findByIdAndUpdate(id, newCourse, { new:true });
                
                return res.json({
                    ok: true,
                    course: updatedCourse,
                })
            }
        } else {
            const courseCheck = await Course.findById( id );
        
            if( !courseCheck ){
                return res.status(404).json({
                    ok: false, 
                    msg: 'No se encontro el curso'
                })
            }

            const newCourse = req.body;

            const updatedCourse = await Course.findByIdAndUpdate(id, newCourse, { new:true });
            
            return res.json({
                ok: true,
                course: updatedCourse,
            })
        }

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador del sistema'
        })
        
    }
}


const deleteCourse = async( req, res = response ) => {

    const { id } = req.params;
    console.log(id);
    try {

        const course = await Course.findById( id );


        if( !course ){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro la seccion'
            })
        }

        const courseDeleted = await Course.findByIdAndDelete( id );

        return res.json({
            ok: true, 
            course: courseDeleted
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador del sistema'
        })
    }


}




module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse
}