$(".sidebar-link.usuarios").addClass("active").addClass("only");
$(".sidebar-link.ver-pedidos").addClass("active");

function print() {
    var conteudo = document.getElementById('print').innerHTML;
    tela_impressao = window.open('about:blank');
    tela_impressao.document.write(conteudo);
    tela_impressao.window.print();
    tela_impressao.window.close();
}