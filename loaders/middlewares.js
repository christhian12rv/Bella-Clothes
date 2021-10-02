const UsuarioFisico = require("../models/usuario/registro/UsuarioFisico");
const UsuarioJuridico = require("../models/usuario/registro/UsuarioJuridico");
const webSiteUrl = require("../config/webSiteUrl");
const EmpresaService = require("../services/empresa")

module.exports = (app) => {
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.warning_msg = req.flash("warning_msg");
        res.locals.info_msg = req.flash("info_msg");
        res.locals.coupon_code_msg = req.flash("coupon_code_msg");
        res.locals.web_site_url = webSiteUrl;
        next();
    })

    app.use(async (req, res, next) => {
        res.locals.user = req.user ? req.user.toObject() : null;
        if (res.locals.user) {
            let tipoUsuario;
            if (res.locals.user.tipo == "Fisico")
                tipoUsuario = await UsuarioFisico.findOne({ id_usuario: res.locals.user._id }).lean();
            else
                tipoUsuario = await UsuarioJuridico.findOne({ id_usuario: res.locals.user._id }).lean();

            res.locals.nomeUsuario = tipoUsuario.nome || tipoUsuario.razao_social.substr(0, tipoUsuario.razao_social.indexOf(' '));
        }
        next();
    })

    app.use(async (req, res, next) => {
        let empresa = await EmpresaService.getEmpresa();
        res.locals.empresa = empresa;
        next();
    })
}