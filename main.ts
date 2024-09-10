interface FuncionarioCadastrador {
  nome: string;
  matricula: number;
  cnpj: number;
}

interface Cidadao {
  nome: string;
  idade: number;
  cpf: number;
  vacinado: boolean;
}

abstract class Cadastrador {
  funcionario: FuncionarioCadastrador;
  cidadoes: Cidadao[] = [];

  constructor(funcionario: FuncionarioCadastrador) {
    this.funcionario = funcionario;
  }

  abstract cadastro(): void;
  abstract remove(): void;
  abstract listar(): void;

  verMeusDados() {
    alert(`
      Dados do Funcionário:
      Nome: ${this.funcionario.nome}
      CNPJ: ${this.funcionario.cnpj}
      Matricula: ${this.funcionario.matricula}
    `);
  }

  ehVacinado(): boolean {
    const resp = prompt(`O cidadão está vacinado? (Digite sim ou não)`)?.toLowerCase();
    return resp === "sim";
  }
}

class CadastroFuncionario extends Cadastrador {
  constructor(funcionario: FuncionarioCadastrador) {
    super(funcionario);
  }

  cadastro(): void {
    const novoCidadao: Cidadao = {
      nome: prompt("Nome do cidadão:") || "",
      idade: parseInt(prompt("Idade do cidadão:") || ""),
      cpf: parseInt(prompt("CPF do cidadão (sem caracteres especiais):") || ""),
      vacinado: this.ehVacinado(),
    };
    this.cidadoes.push(novoCidadao);
    alert("Cidadão cadastrado com sucesso!");
  }

  remove(): void {
    let list = this.cidadoes.map((cid, index) => `${index + 1} - ${cid.nome}`).join("\n");
    const res = parseInt(prompt(`Cidadãos cadastrados:\n${list}\nQual deseja remover?`) || "");
    if (res >= 1 && res <= this.cidadoes.length) {
      this.cidadoes.splice(res - 1, 1);
      alert("Cadastro removido com sucesso!");
    } else {
      alert("Índice inválido.");
    }
  }

  listar(): void {
    let list = this.cidadoes.map((cid, index) => `
      (${index + 1}) Nome: ${cid.nome}, Idade: ${cid.idade}, CPF: ${cid.cpf}, Vacinado: ${cid.vacinado}
    `).join("\n");
    alert(`Cidadãos cadastrados:\n${list}`);
  }

  bemvindoFuncionario(): void {
    const opcao = prompt(`
      Olá, ${this.funcionario.nome}, seja bem-vindo!
      O que você deseja fazer?
      1 - Adicionar um novo cadastro de cidadão
      2 - Remover um cadastro de cidadão
      3 - Ver a lista de cidadãos cadastrados
      4 - Ver seus dados pessoais
      0 - Sair
    `);

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
  }
}

class Pessoa {
  isCadastrado(): void {
    const res = parseInt(
      prompt("Você está cadastrado?\n1 - Sim\n2 - Não") || ""
    );

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
  }

  telaDoCadastrado(): void {
    const cpf = parseInt(prompt("Digite seu CPF:") || "");
    let cidadao: Cidadao | undefined = undefined;
    for (let i = 0; i < _cadastro.cidadoes.length; i++) {
      if (_cadastro.cidadoes[i].cpf === cpf) {
        cidadao = _cadastro.cidadoes[i];
        break;
      }
    }
    if (cidadao) {
      alert(`Nome: ${cidadao.nome}, Idade: ${cidadao.idade}, CPF: ${cidadao.cpf}, Vacinado: ${cidadao.vacinado}`);
    } else {
      alert("CPF não encontrado.");
    }
  }

  telaDeCadastro(): void {
    _cadastro.cadastro();
  }
}

const btnStart: any = document.querySelector(".start");
let _cadastro = new CadastroFuncionario({ nome: "Matheus", matricula: 24, cnpj: 999 });
let _pessoa = new Pessoa();


btnStart.addEventListener("click", () => {
  start();
});



function start() {
  const opcao = prompt(`
    Seja bem-vindo!
    Você é um funcionário ou um cidadão?
    1 - Funcionário
    2 - Cidadão
    0 - Sair
  `);

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
