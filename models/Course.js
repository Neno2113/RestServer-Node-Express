const { Schema, model } = require("mongoose");



const courseSchema = Schema({
    course: {
        type: String,
        require: true,
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    }
});


courseSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})



module.exports = model('Course', courseSchema);