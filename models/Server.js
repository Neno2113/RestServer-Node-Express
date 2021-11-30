const express = require('express');
const cors = require('cors');

class Server {  

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/auth';
        this.sectionPath = '/api/section';
        this.coursePath = '/api/course';
        this.studentPath = '/api/student';

        this.middlewares()


        this.routes();
    }


    middlewares(){
        //cors
        this.app.use( cors() );

        //body parser of body
        this.app.use( express.json() );

        this.app.use( express.static('public'));
    }



    routes(){
        this.app.use( this.userPath, require('../routes/auth'));
        this.app.use( this.coursePath, require('../routes/course'));
        this.app.use( this.sectionPath, require('../routes/section'));
        this.app.use( this.studentPath, require('../routes/student'));

    }


    listen(){
        this.app.listen( this.port, () => {
            console.log('Server running at ', this.port );
        })
    }

}




module.exports = Server;