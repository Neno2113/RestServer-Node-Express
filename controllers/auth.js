const { response } = require("express");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");




const createUser = async(req, res = response) => {


    const {  email, password } = req.body;

    try {
        //check if Email exists
        let user = await User.findOne({ email });

        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'Email already taken!'
            })
        }

        user = new User( req.body );

        //encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );


        await user.save();


        //generate jwt
        const token = await generateJWT(user.id, user.name);


        res.status(201).json({
            ok:true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        });
    }

  

}


const loginUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'Email or password are incorrect!!'
            })
        }

        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Email or password are incorrect!!'
            })
        }

        //generate jwt
        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        });
    }

}



const renewToken = async(req, res = response ) => {

    const { uid, name } = req;

    const token = await generateJWT( uid, name );

    res.status(200).json({
        ok: true,
        uid,
        name,
        token
    })
}



module.exports = {
    createUser,
    loginUser,
    renewToken
}