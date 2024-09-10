var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Cadastrador = /** @class */ (function () {
    function Cadastrador(funcionario) {
        this.cidadoes = [];
        this.funcionario = funcionario;
    }
    Cadastrador.prototype.verMeusDados = function () {
        alert("\n      Dados do Funcion\u00E1rio:\n      Nome: ".concat(this.funcionario.nome, "\n      CNPJ: ").concat(this.funcionario.cnpj, "\n      Matricula: ").concat(this.funcionario.matricula, "\n    "));
    };
    Cadastrador.prototype.ehVacinado = function () {
        var _a;
        var resp = (_a = prompt("O cidad\u00E3o est\u00E1 vacinado? (Digite sim ou n\u00E3o)")) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        return resp === "sim";
    };
    return Cadastrador;
}());
var CadastroFuncionario = /** @class */ (function (_super) {
    __extends(CadastroFuncionario, _super);
    function CadastroFuncionario(funcionario) {
        return _super.call(this, funcionario) || this;
    }
    CadastroFuncionario.prototype.cadastro = function () {
        var novoCidadao = {
            nome: prompt("Nome do cidadão:") || "",
            idade: parseInt(prompt("Idade do cidadão:") || ""),
            cpf: parseInt(prompt("CPF do cidadão (sem caracteres especiais):") || ""),
            vacinado: this.ehVacinado(),
        };
        this.cidadoes.push(novoCidadao);
        alert("Cidadão cadastrado com sucesso!");
    };
    CadastroFuncionario.prototype.remove = function () {
        var list = this.cidadoes.map(function (cid, index) { return "".concat(index + 1, " - ").concat(cid.nome); }).join("\n");
        var res = parseInt(prompt("Cidad\u00E3os cadastrados:\n".concat(list, "\nQual deseja remover?")) || "");
        if (res >= 1 && res <= this.cidadoes.length) {
            this.cidadoes.splice(res - 1, 1);
            alert("Cadastro removido com sucesso!");
        }
        else {
            alert("Índice inválido.");
        }
    };
    CadastroFuncionario.prototype.listar = function () {
        var list = this.cidadoes.map(function (cid, index) { return "\n      (".concat(index + 1, ") Nome: ").concat(cid.nome, ", Idade: ").concat(cid.idade, ", CPF: ").concat(cid.cpf, ", Vacinado: ").concat(cid.vacinado, "\n    "); }).join("\n");
        alert("Cidad\u00E3os cadastrados:\n".concat(list));
    };
    CadastroFuncionario.prototype.bemvindoFuncionario = function () {
        var opcao = prompt("\n      Ol\u00E1, ".concat(this.funcionario.nome, ", seja bem-vindo!\n      O que voc\u00EA deseja fazer?\n      1 - Adicionar um novo cadastro de cidad\u00E3o\n      2 - Remover um cadastro de cidad\u00E3o\n      3 - Ver a lista de cidad\u00E3os cadastrados\n      4 - Ver seus dados pessoais\n      0 - Sair\n    "));
        switch (opcao) {
            case "1":
                this.cadastro();
                break;
            case "2":
                this.remove();
                break;
            case "3":
                this.listar();
                break;
            case "4":
                this.verMeusDados();
                break;
            case "0":
                start();
                break;
            default:
                alert("Opção inválida.");
                this.bemvindoFuncionario();
        }
    };
    return CadastroFuncionario;
}(Cadastrador));
var Pessoa = /** @class */ (function () {
    function Pessoa() {
    }
    Pessoa.prototype.isCadastrado = function () {
        var res = parseInt(prompt("Você está cadastrado?\n1 - Sim\n2 - Não") || "");
        switch (res) {
            case 1:
                this.telaDoCadastrado();
                break;
            case 2:
                this.telaDeCadastro();
                break;
            default:
                alert("Opção inválida.");
                this.isCadastrado();
        }
    };
    Pessoa.prototype.telaDoCadastrado = function () {
        var cpf = parseInt(prompt("Digite seu CPF:") || "");
        var cidadao = undefined;
        for (var i = 0; i < _cadastro.cidadoes.length; i++) {
            if (_cadastro.cidadoes[i].cpf === cpf) {
                cidadao = _cadastro.cidadoes[i];
                break;
            }
        }
        if (cidadao) {
            alert("Nome: ".concat(cidadao.nome, ", Idade: ").concat(cidadao.idade, ", CPF: ").concat(cidadao.cpf, ", Vacinado: ").concat(cidadao.vacinado));
        }
        else {
            alert("CPF não encontrado.");
        }
    };
    Pessoa.prototype.telaDeCadastro = function () {
        _cadastro.cadastro();
    };
    return Pessoa;
}());
var btnStart = document.querySelector(".start");
var _cadastro = new CadastroFuncionario({ nome: "Matheus", matricula: 24, cnpj: 999 });
var _pessoa = new Pessoa();
btnStart.addEventListener("click", function () {
    start();
});
function start() {
    var opcao = prompt("\n    Seja bem-vindo!\n    Voc\u00EA \u00E9 um funcion\u00E1rio ou um cidad\u00E3o?\n    1 - Funcion\u00E1rio\n    2 - Cidad\u00E3o\n    0 - Sair\n  ");
    switch (opcao) {
        case "1":
            _cadastro.bemvindoFuncionario();
            break;
        case "2":
            _pessoa.isCadastrado();
            break;
        case "0":
            alert("Saindo...");
            break;
        default:
            alert("Opção inválida.");
            start();
    }
}
