
const mongoose = require('mongoose')
const tasksSchema = new mongoose.Schema({
    name: {
        type: String,
        "required": "Enter Task Name",
        unique: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    created_date:{
        type: Date,
        default: Date.now()
    }
})

const Tasks = mongoose.model("Tasks",tasksSchema)
module.exports = Tasks