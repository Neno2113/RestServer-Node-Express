const { Schema, model } = require("mongoose");




const studentSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    }

});


studentSchema.method('toJSON', () => {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})



module.exports = model('Student', studentSchema);