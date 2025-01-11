document.addEventListener('DOMContentLoaded', function() {
let empresa = document.getElementById("Empresa");
let empresaLabel = document.querySelector('label[for="Empresa"]');
let empresaHelper = document.getElementById("empresaHelper");

let responsavel = document.getElementById("Responsável");
let responsavelLabel = document.querySelector('label[for="Responsável"]');
let responsavelHelper = document.getElementById("responsavelHelper");

let telefone = document.getElementById("Telefone");
let telefoneLabel = document.querySelector('label[for="Telefone"]');
let telefoneHelper = document.getElementById("telefoneHelper");

let email = document.getElementById("Email");
let emailLabel = document.querySelector('label[for="Email"]');
let emailHelper = document.getElementById("emailHelper");

let beneficios = document.getElementById("Benefícios");
let beneficiosLabel = document.querySelector('label[for="Benefícios"]');
let beneficiosHelper = document.getElementById("beneficiosHelper");

//-------------------------------------------------------------------EMPRESA
// Mostrar popup de campo obrigatório
    empresa.addEventListener("focus", () => { 
    empresaLabel.classList.add("required-popup")                     //adicionando a classe
});
// Ocultar popup de campo obrigatório
empresa.addEventListener("blur", () => {
    empresaLabel.classList.remove("required-popup")                     //adicionando a classe
});

empresa.addEventListener("change", (event) => {                       //change só executa quando você clica fora, capturar o valor
    let valor = event.target.value

            //Estrutura de condicional para validar o valor
    if (valor.length < 2) {
        empresa.classList.remove("correct")               //remover a classe correct
        //adiciona a classe error
        empresa.classList.add("error")
        //adicionar uma mensagem de erro
        empresaHelper.innerText = "Digite corretamente o nome da Empresa, por favor."
        //classe visible faz aparecer a mensagem
        empresaHelper.classList.add("visible")
    } else {
        //valor válido
        //remover a classe de erro do userNameInput
        empresa.classList.remove("error")
        //remover a mensagem de ajuda do userNameHelper
        empresaHelper.classList.remove("visible")
        //adicionar a classe correct no userNameInput
        empresa.classList.add("correct")
    }
});

//--------------------------------------------------------------NOME DO SOLICITANTE
// Mostrar popup de campo obrigatório
responsavel.addEventListener("focus", () => { 
    responsavelLabel.classList.add("required-popup")                     //adicionando a classe
});
// Ocultar popup de campo obrigatório
responsavel.addEventListener("blur", () => {
    responsavelLabel.classList.remove("required-popup")                     //adicionando a classe
});
// Validar valor do input
responsavel.addEventListener("change", (event) => {                       //change só executa quando você clica fora, capturar o valor
    let valor = event.target.value
            //Estrutura de condicional para validar o valor
    if (valor.length < 2) {
        responsavel.classList.remove("correct")               //remover a classe correct
        //adiciona a classe error
        responsavel.classList.add("error")
        //adicionar uma mensagem de erro
        responsavelHelper.innerText = "Digite corretamente seu nome, please."
        //classe visible faz aparecer a mensagem
        responsavelHelper.classList.add("visible")
    } else {
        //valor válido
        //remover a classe de erro do userNameInput
        responsavel.classList.remove("error")
        //remover a mensagem de ajuda do userNameHelper
        responsavelHelper.classList.remove("visible")
        //adicionar a classe correct no userNameInput
        responsavel.classList.add("correct")
    }
});

//-------------------------------------------------------------------TELEFONE
// Mostrar popup de campo obrigatório
telefone.addEventListener("focus", () => { 
    telefoneLabel.classList.add("required-popup"); // adicionando a classe
});

// Ocultar popup de campo obrigatório
telefone.addEventListener("blur", () => {
    telefoneLabel.classList.remove("required-popup"); // removendo a classe
});

// Validar valor do input
telefone.addEventListener("change", (event) => { // change só executa quando você clica fora, capturar o valor
    let valor = event.target.value;
    
    // Remover caracteres não numéricos e aplicar máscara
    valor = valor.replace(/\D/g, ""); // Remove caracteres não numéricos
    valor = valor.replace(/^(\d{2})(\d)/g, "($1)$2"); // Adiciona parênteses
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2"); // Adiciona hífen
    event.target.value = valor;

    // Estrutura de condicional para validar o valor
    if (valor.length < 14 || valor.length > 14) { // Considerando um número de telefone no formato (99)99999-9999
        telefone.classList.remove("correct"); // Remover a classe correct
        telefone.classList.add("error"); // Adiciona a classe error
        telefoneHelper.innerText = "Digite corretamente o número de telefone no formato (99)99999-9999, por favor"; // Adicionar uma mensagem de erro
        telefoneHelper.classList.add("visible"); // Classe visible faz aparecer a mensagem
    } else {
        telefone.classList.remove("error"); // Remover a classe de erro do input
        telefoneHelper.classList.remove("visible"); // Remover a mensagem de ajuda
        telefone.classList.add("correct"); // Adicionar a classe correct no input
    }
});

//------------------------------------------------------------Email
// Mostrar popup de campo obrigatório
email.addEventListener("focus", () => { 
    emailLabel.classList.add("required-popup"); // adicionando a classe
});

// Ocultar popup de campo obrigatório
email.addEventListener("blur", () => {
    emailLabel.classList.remove("required-popup"); // removendo a classe
});

// Validar valor do input
email.addEventListener("change", (event) => { // change só executa quando você clica fora, capturar o valor
    let valor = event.target.value;

    // Estrutura de condicional para validar o valor
    if (!valor.includes("@") || !valor.includes(".com")) { // Verificar formato do email
        email.classList.remove("correct"); // Remover a classe correct
        email.classList.add("error"); // Adiciona a classe error
        emailHelper.innerText = "Email inserido não é válido, deve conter '@' e '.com'."; // Adicionar uma mensagem de erro
        emailHelper.classList.add("visible"); // Classe visible faz aparecer a mensagem
    } else {
        email.classList.remove("error"); // Remover a classe de erro do input
        emailHelper.classList.remove("visible"); // Remover a mensagem de ajuda
        email.classList.add("correct"); // Adicionar a classe correct no input
    }
});


//-------------------------------------------------------------Benefícios
// Mostrar popup de campo obrigatório
beneficios.addEventListener("focus", () => { 
    beneficiosLabel.classList.add("required-popup"); // adicionando a classe
});

// Ocultar popup de campo obrigatório
beneficios.addEventListener("blur", () => {
    beneficiosLabel.classList.remove("required-popup"); // removendo a classe
});

// Validar valor do input
beneficios.addEventListener("change", (event) => { // change só executa quando você clica fora, capturar o valor
    let valor = event.target.value;
    let palavras = valor.trim().split(/\s+/); // Conta as palavras

    // Estrutura de condicional para validar o valor
    if (palavras.length < 3 || palavras.length > 1000) { // Verificar se há mais de 1000 palavras
        beneficios.classList.remove("correct"); // Remover a classe correct
        beneficios.classList.add("error"); // Adiciona a classe error
        beneficiosHelper.innerText = "A descrição dos benefícios deve ter entre 3 e 1000 palavras."; // Adicionar uma mensagem de erro
        beneficiosHelper.classList.add("visible"); // Classe visible faz aparecer a mensagem
    } else {
        beneficios.classList.remove("error"); // Remover a classe de erro do input
        beneficiosHelper.classList.remove("visible"); // Remover a mensagem de ajuda
        beneficios.classList.add("correct"); // Adicionar a classe correct no input
    }
});
//--------------------IMAGENS
    let img1 = document.querySelector('.img1');
    let img2 = document.querySelector('.img2');

    // Definindo dimensões fixas para as imagens para manter a estrutura da página
    let fixedWidth = img1.width;
    let fixedHeight = img1.height;

    img1.style.width = fixedWidth + 'px';
    img1.style.height = fixedHeight + 'px';
    img2.style.width = fixedWidth + 'px';
    img2.style.height = fixedHeight + 'px';

    function trocarImagens() {
        // Salvando as fontes das imagens
        let img1Src = img1.src;
        let img2Src = img2.src;

        // Trocando as fontes das imagens
        img1.src = img2Src;
        img2.src = img1Src;

        // Mantendo as dimensões fixas após a troca
        img1.style.width = fixedWidth + 'px';
        img1.style.height = fixedHeight + 'px';
        img2.style.width = fixedWidth + 'px';
        img2.style.height = fixedHeight + 'px';
    }

    setInterval(trocarImagens, 5000);
});



