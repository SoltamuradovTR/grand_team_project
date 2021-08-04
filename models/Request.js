const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    source: String,

    appraisers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Agent'
        }
    ]
}, {timestamps: true})


const Request = mongoose.model("Request", requestSchema)


module.exports = Request