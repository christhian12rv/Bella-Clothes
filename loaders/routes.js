const admin = require("../routes/admin");
const api = require("../routes/api");
const blog = require("../routes/blog");
const carrinho = require("../routes/carrinho");
const compra = require("../routes/compra");
const emailVerificado = require("../routes/emailVerificado");
const escolhaNovaSenha = require("../routes/escolhaNovaSenha");
const login = require("../routes/login");
const loja = require("../routes/loja");
const politica = require("../routes/politica");
const produto = require("../routes/produto");
const reenviarEmail = require("../routes/reenviarEmail");
const registrar = require("../routes/registrar");
const trocarSenha = require("../routes/trocarSenha");
const usuario = require("../routes/usuario");
const verificarEmail = require("../routes/verificarEmail");

module.exports = (app) => {
    app.use("/admin", admin);
    app.use("/api", api);
    app.use("/blog", blog);
    app.use("/carrinho", carrinho);
    app.use("/compra", compra);
    app.use("/emailVerificado", emailVerificado);
    app.use("/escolhaNovaSenha", escolhaNovaSenha);
    app.use("/login", login);
    app.use("/loja", loja);
    app.use("/politica", politica);
    app.use("/produto", produto);
    app.use("/reenviarEmail", reenviarEmail);
    app.use("/registrar", registrar);
    app.use("/trocarSenha", trocarSenha);
    app.use("/usuario", usuario);
    app.use("/verificarEmail", verificarEmail);
}