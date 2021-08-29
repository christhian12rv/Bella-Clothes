// Carregando Módulos
const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 8081;
const fileUpload = require('express-fileupload');
const sharp = require("sharp");
var sizeOf = require('image-size');

const registrar = require("./routes/registrar");
const produto = require("./routes/produto");
const carrinho = require("./routes/carrinho");
const compra = require("./routes/compra");
const usuario = require("./routes/usuario");
const blog = require("./routes/blog");
const admin = require("./routes/admin");
const politica = require("./routes/politica");
const api = require("./routes/api");

const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

const db = require("./config/db");

const passport = require("passport");
/* require("./config/auth")(passport); */

// Configurações
//Sessão
app.use(session({
    secret: "a9p1i6c49001",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Middlewares
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.warning_msg = req.flash("warning_msg");
    res.locals.info_msg = req.flash("info_msg");
    res.locals.coupon_code_msg = req.flash("coupon_code_msg");
    res.locals.user = req.user || null;
    next();
})

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI).then(() => {
    console.log("Conectado ao MongoDB!");
}).catch((erro) => {
    console.log("Erro ao se conectar. Erro: " + erro);
})

// Public
app.use(express.static(path.join(__dirname, "public")));

app.use(fileUpload());

// Rotas
app.get("/", (req, res) => {
    res.render("./home/index", {
        css: "home.css",
        js: "home.js",
        title: "Bella Clothes"
    });
})

app.get("/login", (req, res) => {

    res.render("./usuario/login", {
        css: "login.css",
        title: "Login",
        error_msg: req.flash("Houve um erro ao listar postagens. Erro: yaai!")
    });
})

app.get("/loja", (req, res) => {
    res.render("loja", { css: "loja.css", js: "loja.js", title: "Loja" });
})

app.get("/teste", (req, res) => {
    res.send("<form action='/testeEnviar' method='post' enctype='multipart/form-data'>Select image to upload:<input type='file' name='imagemUpload' id='fileToUpload'><input type='submit' value='Upload Image' name='submit'></form>");
})

app.post("/testeEnviar", (req, res) => {
    // Verifica se a imagem existe
    res.send(req.files);
    /* const caminhoArquivo = path.join(__dirname) + "/public/img/" + req.files.imagemUpload.name;

    fs.access(caminhoArquivo, fs.constants.F_OK, (err) => {
        if (err) {
            req.files.imagemUpload.mv(caminhoArquivo, function (err) {
                if (err) {
                    return res.redirect("/500", { erro: err });
                }

                res.send('File uploaded!');
                sizeOf(caminhoArquivo, function (err, dimensions) {
                    if (err) {
                        return res.redirect("/500", { erro: err });
                    }

                    const imagemNome = path.parse(req.files.imagemUpload.name).name;
                    const imagemExtensao = path.parse(req.files.imagemUpload.name).ext;
                    const imagemLarge = imagemNome + "-large" + imagemExtensao;
                    sharp(caminhoArquivo).resize(dimensions.width * 2, dimensions.height * 2).toFile(path.join(__dirname) + "/public/img/" + imagemLarge, (err, info) => { });
                })

            });
        } else {
            res.send("Arquivo já existe!");
        }
    }); */
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

app.get("/mensagemDinamica", (req, res) => {
    let { tipoMsg, textoMsg, toastId } = req.query;
    let autoHideToast = req.query.autoHideMsg ? 'data-delay="3000"' : 'data-autohide="false"';
    let buttonNotAutoHide = req.query.autoHideMsg ? '' : '<button type="button" class="toast-close m-auto" data-dismiss="toast" aria-label="Close"><i class="bi bi-x-lg"></i></button>';
    let mensagemDinamica =
        '        <div class="toast show ' + tipoMsg + ' align-items-center" role="alert" aria-live="assertive" aria-atomic="true" id="toast-' + toastId + '"' +
        '            ' + autoHideToast + '>' +
        '             <div class="d-flex">' +
        '                <div class="toast-icon m-auto">' +
        '                    <i class="bi bi-check-lg"></i>' +
        '                </div>' +
        '                <div class="toast-body">' +
        textoMsg +
        '                </div>' +
        buttonNotAutoHide +
        '            </div>' +
        '        </div>';
    res.send(mensagemDinamica);
})

app.get("/ajuda", (req, res) => {
    var ajuda = req.query.ajuda;
    console.log(ajuda);
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
        title: "Erro 404 | Bella Clothes"
    })
})

app.get("/erro-500", (req, res) => {
    res.render("erros/erro_500", {
        css: "erros/erro_500.css",
        title: "Erro 500 | Bella Clothes"
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

app.use("/registrar", registrar);
app.use("/produto", produto);
app.use("/carrinho", carrinho);
app.use("/compra", compra);
app.use("/usuario", usuario);
app.use("/blog", blog);
app.use("/admin", admin);
app.use("/politica", politica);
app.use("/api", api);

app.get("/admin/*", function (req, res) {
    res.status(404).redirect("/admin/erro-404");
})

app.get("*", function (req, res) {
    res.status(404).redirect("/erro-404");
})

app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
})