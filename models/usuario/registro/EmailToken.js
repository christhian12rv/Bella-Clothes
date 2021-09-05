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
    }
}, { timestamps: true })

module.exports = mongoose.model("emailTokens", EmailToken);