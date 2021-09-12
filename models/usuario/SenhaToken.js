const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SenhaToken = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
}, { timestamps: true })

SenhaToken.index({ expiresAt: 1 }, { expireAfterSeconds: 3600 });
module.exports = mongoose.model("senhaTokens", SenhaToken);