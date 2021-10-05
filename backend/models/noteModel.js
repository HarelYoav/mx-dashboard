const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        isPrivate: {
            type: Boolean,
            default: true,
        },
        user: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User',
            },
            name: {
                type: String,
                required: true,
            }
        },
    },
    {
        timestamps: true,
    },
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;