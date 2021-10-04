const express = require("express");
const router = express.Router();
const { adminIsLoggedIn } = require("../middlewares/adminIsLoggedIn");

const EmpresaValidator = require("../middlewares/validators/empresa");
const ProdutoValidator = require("../middlewares/validators/produto");

const AdminController = require("../controllers/admin");
const EmpresaController = require("../controllers/empresa");
const ProdutoController = require("../controllers/produto");

router.get("/login", (req, res) => {
    res.render("admin/login", {
        css: "admin/login.css",
        js: "admin/login.js",
        title: "Login | Bella Clothes Admin",
        paginaAdmin: true,
        loginAdmin: true,
        error_login_message: req.flash("error_login_message")
    })
})
    .post("/login", AdminController.login)

/* router.get("/*", adminIsLoggedIn); */

router.get("/configurar-imagem-sidebar", (req, res) => {
    res.render("admin/painel de controle/imagemSidebar", {
        css: "admin/imagemSidebar.css",
        js: "admin/imagemSidebar.js",
        title: "Configurar Barra Lateral | Bella Clothes Admin",
        paginaAdmin: true
    })
})
router.get("/painel-de-controle", (req, res) => {
    req.flash('success_msg', 'This is a message from the "/" endpoint');
    res.render("admin/painel de controle/painelControle", {
        css: "admin/painel de controle/painelControle.css",
        js: "admin/painel de controle/painelControle.js",
        title: "Painel de Controle | Bella Clothes Admin",
        paginaAdmin: true,
        success_msg: req.flash('success_msg')
    })
})
router.get("/painel-de-controle/pedidos", (req, res) => {
    res.render("admin/painel de controle/painelControlePedidos", {
        css: "admin/painel de controle/painelControlePedidos.css",
        js: "admin/painel de controle/painelControlePedidos.js",
        title: "Painel de Controle - Pedidos | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/painel-de-controle/receita-de-vendas", (req, res) => {
    res.render("admin/painel de controle/painelControleReceitaVendas", {
        css: "admin/painel de controle/painelControleReceitaVendas.css",
        js: "admin/painel de controle/painelControleReceitaVendas.js",
        title: "Painel de Controle - Receita de Vendas | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/painel-de-controle/quantidade-de-vendas", (req, res) => {
    res.render("admin/painel de controle/painelControleQuantidadeVendas", {
        css: "admin/painel de controle/painelControleQuantidadeVendas.css",
        js: "admin/painel de controle/painelControleQuantidadeVendas.js",
        title: "Painel de Controle - Quantidade de Vendas | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/painel-de-controle/usuarios", (req, res) => {
    res.render("admin/painel de controle/painelControleUsuarios", {
        css: "admin/painel de controle/painelControleUsuarios.css",
        js: "admin/painel de controle/painelControleUsuarios.js",
        title: "Painel de Controle - Usuários | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/ver-usuarios", (req, res) => {
    res.render("admin/usuarios/verUsuarios", {
        css: "admin/usuarios/verUsuarios.css",
        js: "admin/usuarios/verUsuarios.js",
        title: "Usuários | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/usuario/:id", (req, res) => {
    res.render("admin/usuarios/usuario", {
        css: "admin/usuarios/usuario.css",
        js: "admin/usuarios/usuario.js",
        title: "Alexander Pierce | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/ver-pedidos", (req, res) => {
    res.render("admin/usuarios/verPedidos", {
        css: "admin/usuarios/verPedidos.css",
        js: "admin/usuarios/verPedidos.js",
        title: "Pedidos | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/pedido/:id", (req, res) => {
    res.render("admin/usuarios/pedido", {
        css: "admin/usuarios/pedido.css",
        js: "admin/usuarios/pedido.js",
        title: "Detalhes do Pedido | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/ver-produtos", (req, res) => {
    res.render("admin/produtos/verProdutos", {
        css: "admin/produtos/verProdutos.css",
        js: "admin/produtos/verProdutos.js",
        title: "Produtos | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/produto/:id", (req, res) => {
    res.render("admin/produtos/produto", {
        css: "admin/produtos/produto.css",
        js: "admin/produtos/produto.js",
        title: "Tênis Nike | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/adicionar-produto", (req, res) => {
    res.render("admin/produtos/adicionarProduto", {
        css: "admin/produtos/adicionarProduto.css",
        js: "admin/produtos/adicionarProduto.js",
        title: "Adicionar Produto | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/produtos/categorias", ProdutoController.getCategorias)
    .post("/produtos/categorias", ProdutoValidator.addCategoria, ProdutoController.addCategoria)
    .put("/produtos/categorias", ProdutoValidator.updateCategoria, ProdutoController.updateCategoria)


router.get("/produtos/ver-subcategorias", (req, res) => {
    res.render("admin/produtos/verSubcategorias", {
        css: "admin/produtos/verSubcategorias.css",
        js: "admin/produtos/verSubcategorias.js",
        title: "Produtos Subcategorias | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/produtos/avaliacoes", (req, res) => {
    res.render("admin/produtos/avaliacoes", {
        css: "admin/produtos/avaliacoes.css",
        js: "admin/produtos/avaliacoes.js",
        title: "Avalições de Produtos | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/blog/posts", (req, res) => {
    res.render("admin/blog/verPosts", {
        css: "admin/blog/verPosts.css",
        js: "admin/blog/verPosts.js",
        title: "Blog Posts | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/blog/post/:id", (req, res) => {
    res.render("admin/blog/post", {
        css: "admin/blog/post.css",
        js: "admin/blog/post.js",
        title: "Admin Post - Dicas para deixar seu tênis limpinho | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/blog/adicionar-post", (req, res) => {
    res.render("admin/blog/adicionarPost", {
        css: "admin/blog/adicionarPost.css",
        js: "admin/blog/adicionarPost.js",
        title: "Adicionar Post | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/blog/categorias", (req, res) => {
    res.render("admin/blog/categorias", {
        css: "admin/blog/categorias.css",
        js: "admin/blog/categorias.js",
        title: "Blog Categorias | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/pagina-inicial-loja", (req, res) => {
    res.render("admin/outros/paginaInicialLoja", {
        css: "admin/outros/paginaInicialLoja.css",
        js: "admin/outros/paginaInicialLoja.js",
        title: "Loja - Página Inicial | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/cupons-desconto", (req, res) => {
    res.render("admin/outros/cuponsDesconto", {
        css: "admin/outros/cuponsDesconto.css",
        js: "admin/outros/cuponsDesconto.js",
        title: "Cupons de Desconto | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/empresa", (req, res) => {
    res.render("admin/configuracoes/empresa", {
        css: "admin/configuracoes/empresa.css",
        js: "admin/configuracoes/empresa.js",
        title: "Empresa | Bella Clothes Admin",
        paginaAdmin: true
    })
})
    .post("/empresa", EmpresaValidator.updateEmpresa, EmpresaController.updateEmpresa)

router.get("/erro-404", (req, res) => {
    res.render("admin/erro_404", {
        css: "admin/erro_404.css",
        title: "Erro 404 | Bella Clothes Admin",
        paginaAdmin: true
    })
})

router.get("/erro-500", (req, res) => {
    res.render("admin/erro_500", {
        css: "admin/erro_500.css",
        title: "Erro 500 | Bella Clothes Admin",
        paginaAdmin: true
    })
})

module.exports = router;