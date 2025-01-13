document.addEventListener('DOMContentLoaded', function () {
    console.log('JS carregado');

    const form = document.querySelector('form');
    const nomeInput = form.querySelector('input[placeholder="Nome Completo"]');
    const emailInput = form.querySelector('input[placeholder="E-mail"]');
    const telefoneInput = form.querySelector('input[placeholder="Telefone para contato"]');
    const dataInput = form.querySelector('input[placeholder="Data do Evento"]');
    const pessoasInput = form.querySelector('input[placeholder="Quantas pessoas?"]');
    
    const MAX_NOME_LENGTH = 50;
    const MAX_EMAIL_LENGTH = 50;

    function showError(inputElement, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'white';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '4px';
        errorDiv.textContent = message;
        removeError(inputElement);
        inputElement.parentElement.appendChild(errorDiv);
        inputElement.classList.add('erro');
    }

    function removeError(inputElement) {
        const existingError = inputElement.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        inputElement.classList.remove('erro');
    }

    nomeInput.addEventListener('input', function (e) {
        if (e.target.value.length > MAX_NOME_LENGTH) {
            e.target.value = e.target.value.substring(0, MAX_NOME_LENGTH);
            showError(e.target, `O nome não pode ter mais de ${MAX_NOME_LENGTH} caracteres.`);
        } else if (e.target.value.trim() === '') {
            showError(e.target, 'O nome é obrigatório.');
        } else {
            removeError(e.target);
        }
    });

    emailInput.addEventListener('input', function (e) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (e.target.value.length > MAX_EMAIL_LENGTH) {
            e.target.value = e.target.value.substring(0, MAX_EMAIL_LENGTH);
            showError(e.target, `O email não pode ter mais de ${MAX_EMAIL_LENGTH} caracteres.`);
        } else if (!emailRegex.test(e.target.value)) {
            showError(e.target, 'Digite um email válido.');
        } else {
            removeError(e.target);
        }
    });

    telefoneInput.addEventListener('input', function (e) {
        let numero = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (numero.length !== 11) { // Verifica se o telefone tem exatamente 11 dígitos
            showError(e.target, 'O telefone deve conter 11 dígitos (DDD + celular).');
        } else {
            removeError(e.target);
        }
        if (numero.length === 11) {
            numero = numero.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        }
        e.target.value = numero;
    });

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataMaxima = new Date('2032-12-31T23:59:59');
    dataInput.min = hoje.toISOString().split('T')[0];
    dataInput.max = dataMaxima.toISOString().split('T')[0];

    dataInput.addEventListener('change', function (e) {
        const dataSelecionada = new Date(e.target.value);
        if (dataSelecionada < hoje) { 
            showError(e.target, 'A data não pode ser anterior à data atual.');
        } else if (dataSelecionada > dataMaxima) {  
            showError(e.target, 'A data não pode ser posterior a 31/12/2032.');
        } else {
            removeError(e.target);
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();  
        const campos = form.querySelectorAll('input[required]');
        let valido = true;
        campos.forEach(campo => {
            if (!campo.value.trim()) {
                showError(campo, 'Este campo é obrigatório.');
                valido = false;
            }
        });

        const temErros = document.querySelectorAll('.error-message').length > 0;
        if (valido && !temErros) {
            const formData = new FormData(form);
            const reserva = Object.fromEntries(formData.entries());
            if (confirm('Confirmar reserva com os seguintes dados?\n' +
                `Nome: ${reserva['Nome Completo']}\n` +
                `Email: ${reserva['E-mail']}\n` +
                `Telefone: ${reserva['Telefone para contato']}\n` +
                `Data: ${reserva['Data do Evento']}\n` +
                `Pessoas: ${reserva['Quantas pessoas?']}`)) {
                alert('Reserva agendada com sucesso! Aguarde o contato de nossa equipe!');
                form.reset();  
                document.querySelectorAll('.error-message').forEach(msg => msg.remove()); 
            }
        } else {
            alert('Por favor, corrija os erros antes de enviar.');
        }
    });
});
