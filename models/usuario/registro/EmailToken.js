const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailToken = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: {
            expires: 86400000
        }
    }
}, { timestamps: true })

module.exports = mongoose.model("emailTokens", EmailToken);