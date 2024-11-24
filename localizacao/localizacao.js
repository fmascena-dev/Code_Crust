const inputCEP = document.querySelector('.search input');
const buttonEncontrar = document.querySelector('.search button');
const divResultados = document.createElement('div');
document.querySelector('.search').appendChild(divResultados);

buttonEncontrar.addEventListener('click', () => {
  const cep = inputCEP.value;
  const bairro = getBairroFromCEP(cep);

  if (bairro === 'Centro') {
    divResultados.innerHTML = `
      <p>Loja Centro: Av. Afonso Pena, 2024.</p>
    `;
  } else if (bairro === 'Jardim dos Estados') {
    divResultados.innerHTML = `
      <p>Loja Jardim dos Estados: Rua Euclides da Cunha, 3600.</p>
    `;
  } else {
    divResultados.innerHTML = '<p>Por enquanto não atendemos sua região.</p>';
  }
});