document.addEventListener('DOMContentLoaded', function () {
    console.log('JS carregado');

    const form = document.getElementById('formulario-reservas');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const dataInput = document.getElementById('data');
    const horarioInput = document.getElementById('horario');
    const pessoasInput = document.getElementById('pessoas');
    
    const MAX_NOME_LENGTH = 50;
    const MAX_EMAIL_LENGTH = 50;

    // Função genérica para mostrar erro
    function showError(inputElement, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '4px';
        errorDiv.textContent = message;
        
        // Remove mensagem de erro anterior se existir
        removeError(inputElement);
        
        // Adiciona nova mensagem de erro após o input
        inputElement.parentElement.appendChild(errorDiv);
        inputElement.classList.add('erro');
    }

    // Função genérica para remover erro
    function removeError(inputElement) {
        const existingError = inputElement.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        inputElement.classList.remove('erro');
    }

    // Validação do nome
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

    // Validação do email
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

    // Validação do telefone
    telefoneInput.addEventListener('input', function (e) {
        let numero = e.target.value.replace(/\D/g, '');

        if (numero.length < 10) {
            showError(e.target, 'O telefone deve ter pelo menos 10 dígitos.');
        } else {
            removeError(e.target);
        }

        if (numero.length >= 11) {
            numero = numero.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (numero.length >= 6) {
            numero = numero.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (numero.length >= 2) {
            numero = numero.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        }

        e.target.value = numero;
    });

    // Validação da data
const hoje = new Date();
hoje.setHours(0, 0, 0, 0);
dataInput.min = hoje.toISOString().split('T')[0];

// Define data máxima (31/12/2025)
const dataMaxima = new Date('2025-12-31').toISOString().split('T')[0];
dataInput.max = dataMaxima;

dataInput.addEventListener('change', function (e) {
    const dataSelecionada = new Date(e.target.value + 'T00:00:00');
    
    if (dataSelecionada.getTime() < hoje.getTime()) {
        showError(e.target, 'A data não pode ser anterior à data atual.');
    } else if (dataSelecionada > new Date(dataMaxima)) {
        showError(e.target, 'A data não pode ser posterior a 31/12/2025.');
    } else {
        removeError(e.target);
    }
});

// Validação do horário
horarioInput.addEventListener('input', function (e) {
    const [hora, minuto] = e.target.value.split(':').map(Number);
    
    // Verifica se o minuto é múltiplo de 15
    const minutoAjustado = Math.round(minuto / 15) * 15;
    
    // Formata o horário para manter o padrão HH:MM
    const horaFormatada = hora.toString().padStart(2, '0');
    const minutoFormatado = minutoAjustado.toString().padStart(2, '0');
    
    if (hora < 18 || hora > 22 || (hora === 22 && minuto > 0)) {
        showError(e.target, 'O horário deve estar entre 18:00 e 22:00.');
    } else {
        e.target.value = `${horaFormatada}:${minutoFormatado}`;
        removeError(e.target);
    }
});

// Define horário mínimo e máximo permitido
horarioInput.min = "18:00";
horarioInput.max = "22:00";
horarioInput.step = "900"; // 900 segundos = 15 minutos

    // Validação do formulário
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
        
        // Mostra confirmação
        if (confirm('Confirmar reserva com os seguintes dados?\n' +
            `Nome: ${reserva.nome}\n` +
            `Email: ${reserva.email}\n` +
            `Telefone: ${reserva.telefone}\n` +
            `Data: ${reserva.data}\n` +
            `Horário: ${reserva.horario}\n` +
            `Pessoas: ${reserva.pessoas}`)) {
            
            alert('Reserva agendada com sucesso! Aguarde o contato de nossa equipe!');
            form.reset();
            document.querySelectorAll('.error-message').forEach(msg => msg.remove());
        }
    } else {
        alert('Por favor, corrija os erros antes de enviar.');
    }
});
});
