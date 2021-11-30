const { response } = require("express");
const Section = require("../models/Section");




const createSection = async(req, res = response ) => {

    const { section } = req.body;

    try {

        let sectionCreated = await Section.findOne({ section });

        if( sectionCreated ){
            return res.status(400).json({
                ok: false,
                msg: 'Section already exists!!'
            })
        }


        const sectionNew = new Section( req.body );

        await sectionNew.save();

        res.status(201).json({
            ok: true, 
            section: sectionNew
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador del sistema!'
        })
    }
}


const getSections = async(req, res = response ) => {

    const sections = await Section.find();

    return res.json({
        ok: true,
        sections
    })

}


const updateSection = async(req, res = response ) => {

    const { id } = req.params;
    // const uid = req.uid;

    try {
        const section = await Section.findById( id );

        if( !section ){
            return res.status(404).json({
                ok:false,
                msg: 'No se encontro esta seccion'
            })
        }

        const newSection = req.body;

        const updateSection = await Section.findByIdAndUpdate(id, newSection, { new: true } );

        return res.json({
            ok: true, 
            section: updateSection
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Hable con el administrador del sistema!'
        })
    }


}

const deleteSection = async(req, res = response ) => {

    const { id } = req.params;

    try {

        const section = await Section.findById( id );

        if( !section ){
            return res.status(404).json({
                ok: false, 
                msg: 'No se encontro la seccion!'
            })
        }

        const sectionDeleted = await Section.findByIdAndDelete( id );


        return res.json({
            ok: true, 
            section: sectionDeleted
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false, 
            msg: 'Hable con el administrador del sistema!'
        })
    }

}




module.exports = {
    createSection,
    getSections,
    updateSection,
    deleteSection
}