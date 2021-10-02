// Carregando Módulos
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8081;

const fileUpload = require('express-fileupload');

const handlebars = require("express-handlebars");
const handlebarsToCompiler = require("handlebars");
const bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
require("./config/auth")(passport);

// Configurações
//Session
app.use(session({
    secret: "a9p1i6c49001",
    resave: true,
    saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

// Middlewares
require("./loaders/middlewares")(app)

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main", helpers: require("./config/handlebarsHelpers") }));
app.set("view engine", "handlebars");

// Mongoose
require("./loaders/mongooseConnection")();

//Crons
require("./loaders/crons")();

// Public
app.use(express.static(path.join(__dirname, "public")));

// Extra
app.use(fileUpload());

// Routes
app.get("/", (req, res) => {
    res.render("./home/index", {
        css: "home.css",
        js: "home.js",
        title: "Bella Clothes"
    });
})

app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
})

app.post("/afeas", (req, res) => {
    /*  for (let i = 0; i < req.query.variacao.length; i++) {
         console.log(req.query.variacao[i].cor);
     } */
    var variacao = [];
    var { quantidade_cores } = req.body;
    for (let i = 1; i <= parseInt(quantidade_cores); i++) {
        variacao.push(
            {
                cor: req.body['variacao[' + i + '][cor]'],
                preco_original: req.body['variacao[' + i + '][preco_original]'],
                tipo_desconto: req.body['variacao[' + i + '][tipo_desconto]'],
            }
        );
        for (let j = 1; j <= parseInt(req.body['variacao[' + i + '][qtd_parcelas]']); j++) {
            variacao.push(
                {
                    parcela: [
                        {
                            vezes: req.body['variacao[' + i + '][parcela_box_' + j + '][vezes_parcela]']
                        }
                    ]
                }
            )
        }
    }

    res.send(req.body);
})

app.post("/getToast", async (req, res) => {
    let { type, text, autoHide, autoHideDelay, toastId } = req.body;
    try {
        await readHTMLFile("templates/toast.handlebars", async (err, html) => {
            try {
                let getIcon = {
                    'success': 'bi-check-lg',
                    'error': 'shield-exclamation',
                    'warning': 'exclamation-triangle',
                    'info:': 'info-circle'
                };
                let template = handlebarsToCompiler.compile(html);
                let replacements = {
                    type: type,
                    text: text,
                    ...(autoHide != 'false' && {autoHide: autoHide}),
                    ...(autoHideDelay && {autoHideDelay: autoHideDelay}),
                    toastId: toastId,
                    icon: getIcon[type]
                };
                console.log(replacements);
                let toastHTML = template(replacements);
                console.log(toastHTML);
                res.send(toastHTML);
            } catch (error) {
                throw error;
            }
        })
    } catch (error) {
        res.redirect("/erro-500");
    }
})

app.get("/ajuda", (req, res) => {
    var ajuda = req.query.ajuda;
    res.render("ajuda", {
        css: "ajuda.css",
        title: "Ajuda | Bella Clothes",
        js: "ajuda.js",
        ajuda: ajuda
    })
})

app.get("/erro-404", (req, res) => {
    res.render("erros/erro_404", {
        css: "erros/erro_404.css",
        title: "Página não encontrada | Bella Clothes"
    })
})

app.get("/erro-500", (req, res) => {
    res.render("erros/erro_500", {
        css: "erros/erro_500.css",
        title: "Erro Interno | Bella Clothes"
    })
})

app.get("/ver-rotas", (req, res) => {
    var rte, rts = [];
    var prevParam, breakLine = "";
    app._router.stack.forEach(function (middleware, middlewareIndex, routerArr) {
        if (middleware.route && middleware.route.path != "") { // rts registered directly on the app
            rts.push('<a href="' + (middleware.route.path) + '" style="margin-bottom: 1rem !important;">' + (middleware.route.path) + '</a><br>' + breakLine);
        } else if (middleware.name === 'router') { // router middleware 

            middleware.handle.stack.forEach(function (handler, index, midArr) {
                var regexp = middleware.regexp.toString();
                var routeParam = regexp.substr(3, (regexp.substr(3).indexOf("?") - 2));

                rte = handler.route;
                if (midArr.length != prevParam)
                    breakLine = "<br>";
                rts.push(breakLine + '<a href="' + (routeParam + rte.path) + '" style="margin-bottom: 1rem !important;">' + (routeParam + rte.path) + '</a><br>');
                breakLine = "";
                prevParam = midArr.length;
            });
        }
    });
    var links = rts.join("");
    res.send(links);
})

// Use Routes
require("./loaders/routes")(app);

app.get("/admin/*", function (req, res) {
    res.status(404).redirect("/admin/erro-404");
})

app.get("*", function (req, res) {
    res.status(404).redirect("/erro-404");
})



function readHTMLFile(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
        if (err)
            throw err;
        else
            return callback(null, html);
    })
}



app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
})