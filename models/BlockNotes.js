import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema({
    blockNotes: {
        name: {
            type: String,
        },
        notes: {
            note: {
                value: { type: String },
                statusDone: { type: Boolean },

                type: Object
            },
            type: [],
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},

    {
        timestamps: true,
    })

export default mongoose.model('Block', BlockSchema);

