const express = require("express");
const router = express.Router();

router.get("/politica-de-privacidade", (req, res) => {
    res.render("politica/politicaPrivacidade", {
        css: "politica/politicaPrivacidade.css",
        title: "Política de Privacidade | Bella Clothes"
    })
})

router.get("/regulamentos", (req, res) => {
    res.render("politica/regulamentos", {
        css: "politica/regulamentos.css",
        title: "Regulamentos | Bella Clothes"
    })
})

module.exports = router;