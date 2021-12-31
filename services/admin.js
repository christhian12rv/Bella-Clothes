const Usuario = require("../models/usuario/registro/Usuario");
const UsuarioFisico = require("../models/usuario/registro/UsuarioFisico");
const UsuarioJuridico = require("../models/usuario/registro/UsuarioJuridico");
const Endereco = require("../models/usuario/registro/Endereco");
const Cartao = require("../models/usuario/Cartao");
const Produto = require("../models/produto/Produto");
const VariacaoProduto = require("../models/produto/VariacaoProduto");

exports.excluirUsuario = async (id_usuario) => {
    try {
        let usuario = await Usuario.findById(id_usuario).lean();
        if (!usuario)
            return { status: 400, error: "Usuário inválido" };

        await Usuario.deleteOne({ _id: id_usuario });
        if (usuario.tipo === 'Fisico')
            await UsuarioFisico.deleteOne({ id_usuario: id_usuario });
        else
            await UsuarioJuridico.deleteOne({ id_usuario: id_usuario });

        await Endereco.deleteMany({ id_usuario: id_usuario });
        await Cartao.deleteMany({ id_usuario: id_usuario });

        return { status: 200 };
    } catch (error) {
        throw new Error(error);
    }
}

exports.adicionarProduto = async (body, files) => {
    try {
        const produto = new Produto({
            nome_produto: body.nome_produto,
            genero: body.genero,
            infantil: (body.genero === 'Infantil') ? body.infantil : undefined,
            categoria: body.categoria,
            subcategoria: body.subcategoria,
            marca: body.marca,
            materiais: body.materiais,
            composicao: body.composicao,
            peso: body.peso,
            tipo_peso: body.tipo_peso,
            indicado_para: body.indicado_para,
            descricao_introducao: body.descricao_introducao,
            descricao_recursos: body.descricao_recursos,
            quantidade_cores: body.quantidade_cores
        })
        await produto.save();

        await body.variacao.forEach(async (v, vIndex) => {
            let imagens = [];
            await files.forEach((file) => {
                if (file.fieldname === 'variacao[' + vIndex + '][escolherImagem]')
                    imagens.push(file.filename);
            });
            let variacaoProduto = new VariacaoProduto({
                produto: produto._id,
                cor: v.cor,
                preco_original: v.preco_original,
                slug: v.slug,
                tipo_desconto: (v.tipo_desconto && v.tipo_desconto !== '') ? v.tipo_desconto : undefined,
                desconto: (v.tipo_desconto && v.desconto !== '') ? v.desconto : undefined,
                parcelas: v.parcela_box,
                tamanhos: v.tamanho_box,
                imagens: imagens,
            })
            await variacaoProduto.save();
        })
    } catch (error) {
        throw new Error(error);
    }
}