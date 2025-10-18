class Funcionario {
  constructor(nome, idade, cargo, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cargo = cargo;
    this.salario = parseFloat(salario);
  }

  toString() {
    return `${this.nome} (${this.cargo}) - R$ ${this.salario.toFixed(2)}`;
  }
}

const funcionarios = [];
const form = document.getElementById('form-funcionario');
const tabela = document.getElementById('tabela-funcionarios');
const relatoriosDiv = document.getElementById('relatorios');

let editIndex = null;

const renderTabela = () => {
  tabela.innerHTML = '';
  funcionarios.forEach((f, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${f.nome}</td>
      <td>${f.idade}</td>
      <td>${f.cargo}</td>
      <td>R$ ${f.salario.toFixed(2)}</td>
      <td>
        <button onclick="editarFuncionario(${i})">Editar</button>
        <button onclick="excluirFuncionario(${i})">Excluir</button>
      </td>
    `;
    tabela.appendChild(row);
  });
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const idade = document.getElementById('idade').value;
  const cargo = document.getElementById('cargo').value;
  const salario = document.getElementById('salario').value;

  const funcionario = new Funcionario(nome, idade, cargo, salario);

  if (editIndex === null) {
    funcionarios.push(funcionario);
    alert('Funcionário cadastrado!');
  } else {
    funcionarios[editIndex] = funcionario;
    editIndex = null;
    alert('Funcionário atualizado!');
  }

  form.reset();
  renderTabela();
});

window.excluirFuncionario = (i) => {
  funcionarios.splice(i, 1);
  alert('Funcionário excluído!');
  renderTabela();
};

window.editarFuncionario = (i) => {
  const f = funcionarios[i];
  document.getElementById('nome').value = f.nome;
  document.getElementById('idade').value = f.idade;
  document.getElementById('cargo').value = f.cargo;
  document.getElementById('salario').value = f.salario;
  editIndex = i;
};

// ---- Relatórios ----
document.getElementById('btn-salario').addEventListener('click', () => {
  const filtrados = funcionarios.filter(f => f.salario > 5000);
  relatoriosDiv.innerHTML = `<p>Salários > 5000:</p>${filtrados.map(f => f.toString()).join('<br>')}`;
});

document.getElementById('btn-media-salario').addEventListener('click', () => {
  const media = funcionarios.reduce((acc, f) => acc + f.salario, 0) / funcionarios.length || 0;
  relatoriosDiv.innerHTML = `<p>Média salarial: R$ ${media.toFixed(2)}</p>`;
});

document.getElementById('btn-cargos').addEventListener('click', () => {
  const cargos = [...new Set(funcionarios.map(f => f.cargo))];
  relatoriosDiv.innerHTML = `<p>Cargos únicos:</p>${cargos.join(', ')}`;
});

document.getElementById('btn-nomes-maiusculo').addEventListener('click', () => {
  const nomes = funcionarios.map(f => f.nome.toUpperCase());
  relatoriosDiv.innerHTML = `<p>Nomes em maiúsculo:</p>${nomes.join(', ')}`;
});
