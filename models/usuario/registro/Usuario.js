const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        minLength: 14,
        maxLength: 15,
        unique: true,
        required: true
    },
    outro_telefone: {
        type: String,
        maxLength: 15,
        unique: true,
        sparse: true
    },
    foto: {
        type: String,
        unique: true,
        sparse: true
    },
    tipo: {
        type: String,
        enum: ["fisico", "juridico"],
        required: true
    },
    ofertas_email: {
        type: Boolean,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    email_verificado: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("usuarios", Usuario);