const botaoAdiciona = document.querySelector("#adicionar-paciente");
botaoAdiciona.addEventListener("click",(event) => {
    event.preventDefault();

    const form = document.querySelector("#form-adiciona");
    const tabela = document.querySelector(".table__body");

    const paciente = buscaPaciente(form);
    const pacienteTr = criaTr(paciente);

    const erros = verificaForm(paciente);

    if (erros.length != 0) {
        exibeErros(erros);
        return;
    }
    tabela.appendChild(pacienteTr);
    ativaTela(botaoPacientesNav,botaoAdicionaNav,formAdiciona,tabelaPacientes)
    exibeErros(erros);
})
function criaTr(paciente){
    const trCriada = document.createElement("tr");
    trCriada.classList.add("paciente");

    const tdNome = montaTd(paciente.nome);
    tdNome.classList.add("table__body-item--nome")
    trCriada.appendChild(tdNome);
    
    trCriada.appendChild(montaTd(paciente.peso));
    trCriada.appendChild(montaTd(paciente.altura));
    trCriada.appendChild(montaTd(paciente.gordura));
    trCriada.appendChild(montaTd(paciente.imc));
    trCriada.appendChild(montaTd(paciente.estado));

    return trCriada;
}

function montaTd(valor) {
   const tdCriada = document.createElement("td");

   tdCriada.textContent = valor;
   tdCriada.classList.add("table__body-item");

    return tdCriada;
}

function buscaPaciente(form){
    paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value),
        estado: verificaEstado(calculaImc(form.peso.value, form.altura.value))
    }

    return paciente;
}

function calculaImc(pesoValue,alturaValue){
    const peso = pesoValue.replace(",", ".")
    const altura = alturaValue.replace(",", ".")
    const imc = peso / (altura * altura);
    return imc.toFixed(2);
}

function verificaEstado(imc){
    if(imc <= 18.5){
        const abaixoDoPeso = "abaixo do peso";
        return abaixoDoPeso;
    }
    if (imc >= 18.6 && imc <= 24.9){
        const pesoIdeal = "peso ideal";
        return pesoIdeal; 
    }
    if(imc >= 25 && imc <= 29.9){
        const levementeAcima = "levemente acima do peso";
        return levementeAcima;
    }
    if(imc >= 30 && imc <= 34.9){
        const obesidadeGrau1 = "Obesidade grau 1";
        return obesidadeGrau1;
    }
    if(imc >= 35 && imc <= 39.9){
        const obesidadeGrau2 = "Obesidade grau 2 (severa)";
        return obesidadeGrau2;
    }
    if(imc >= 40){
        const obesidadeGrau3 = "Obesidade grau 3 (mórbida)";
        return obesidadeGrau3;
    }
}

//intercalar as telas

const botaoPacientesNav = document.querySelector(".nav__menu-pacientes");
const botaoAdicionaNav = document.querySelector(".nav__menu-adiciona");

const formAdiciona = document.querySelector(".form__container--script")
const tabelaPacientes = document.querySelector(".invisible__script")

botaoAdicionaNav.addEventListener("click",function(){
    ativaTela(botaoAdicionaNav,botaoPacientesNav,tabelaPacientes,formAdiciona)
})

botaoPacientesNav.addEventListener("click",function(){
    ativaTela(botaoPacientesNav,botaoAdicionaNav,formAdiciona,tabelaPacientes)
})

function ativaTela(botao1,botao2,elemento1,elemento2) {
    botao1.classList.add("aba_ativa")
    botao2.classList.remove("aba_ativa")
    elemento1.classList.add("nav__alternate");
    elemento2.classList.remove("nav__alternate");
}

function verificaForm(paciente){
    const erros = [];

    if(paciente.peso < 0 || paciente.peso > 1000){
        erros.push("peso invalido");
    }
    if(paciente.altura < 0 || paciente.altura > 3){
        erros.push("altura invalida");
    }
    if(paciente.peso.length == 0){
        erros.push("o peso não pode ser em branco")
    }
    if(paciente.altura.length == 0){
        erros.push("a altura não pode ser em branco")
    }
    if(paciente.nome.length == 0){
        erros.push("o nome não pode ser em branco")
    }
    if(paciente.gordura.length == 0){
        erros.push("a gordura não pode ser em branco")
    }
    
    return erros;
}

function exibeErros(listaErro) {
    const erroUl = document.querySelector("#lista-erros");
    erroUl.innerHTML = "";

    for (let i = 0; i < listaErro.length; i++) {
        const erro = listaErro[i];

        const erroLi = document.createElement("li");
        erroLi.textContent = erro;
        erroLi.classList.add("erro");
        erroUl.appendChild(erroLi);
    }
}
    
