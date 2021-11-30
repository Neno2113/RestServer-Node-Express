const { Schema, model } = require("mongoose");




const sectionSchema = Schema({
    section: {
        type: String,
        required: true
    }
});


sectionSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})




module.exports = model( 'Section', sectionSchema );