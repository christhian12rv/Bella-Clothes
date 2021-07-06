// Carregando Módulos
const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 8081;
const fileUpload = require('express-fileupload');
const sharp = require("sharp");
var sizeOf = require('image-size');

const produto = require("./routes/produto");
const loja = require("./routes/loja");
const carrinho = require("./routes/carrinho");
const compra = require("./routes/compra");
const usuario = require("./routes/usuario");
const admin = require("./routes/admin");

const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

/*const passport = require("passport");
require("./config/auth")(passport);*/

// Configurações
//Sessão
app.use(session({
    secret: "a9p1i6c49001",
    resave: true,
    saveUninitialized: true
}));

/*app.use(passport.initialize());
app.use(passport.session());*/

app.use(flash());

// Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    /*res.locals.error = req.flash("error");
 
    res.locals.user = req.user || null;*/
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
mongoose.connect("mongodb://localhost/bellaclothes").then(() => {
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
        title: "Login"
    });
})

app.get("/registrar/fisica", (req, res) => {
    res.render("./usuario/registrarFisica", {
        css: "registrar.css",
        js: "/usuario/registrarFisica.js",
        title: "Registrar"
    })
})

app.get("/registrar/juridica", (req, res) => {
    res.render("./usuario/registrarJuridica", {
        css: "registrar.css",
        js: "/usuario/registrarJuridica.js",
        title: "Registrar"
    })
})

app.get("/teste", (req, res) => {
    res.send("<form action='/testeEnviar' method='post' enctype='multipart/form-data'>Select image to upload:<input type='file' name='imagemUpload' id='fileToUpload'><input type='submit' value='Upload Image' name='submit'></form>");
})

app.post("/testeEnviar", (req, res) => {
    // Verifica se a imagem existe
    const caminhoArquivo = path.join(__dirname) + "/public/img/" + req.files.imagemUpload.name;

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
    });
})

app.get("/404", (req, res) => {
    res.render("erros/erro404", { title: "Erro 404" });
})

app.get("/500", (req, res) => {
    res.render("erros/erro500", { title: "Erro 500" });
})

app.use("/produto", produto);
app.use("/loja", loja);
app.use("/carrinho", carrinho);
app.use("/compra", compra);
app.use("/usuario", usuario);
app.use("/admin", admin);

app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
})