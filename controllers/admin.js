const passport = require("passport");

exports.login = async (req, res, next) => {
    try {
        await passport.authenticate("admin-local", {
            successRedirect: "/admin/painel-de-controle",
            failureRedirect: "/admin/login",
            failureFlash: true
        })(req, res, next)
    } catch (error) {
        res.redirect("/erro-500");
    }
}