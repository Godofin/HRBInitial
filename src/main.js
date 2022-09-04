'use strict';
//Get the elements 
const completeForm = (address) =>{
    document.getElementById('address').value = address.logradouro;
    document.getElementById('district').value = address.bairro;
    document.getElementById('city').value = address.localidade;
    document.getElementById('state').value = address.uf;
}

//Validate the length number 
const eNumber = (number) => /^[0-9]+$/.test(number);
const cepValidator = (cep) => cep.length == 8 && eNumber(cep); 

// function get ceo
const findCep = async() => {
    
    const cep = document.getElementById('cep').value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValidator(cep)){
        const dados = await fetch(url);
        const address = await dados.json();
        if (address.hasOwnProperty('erro')){
            document.getElementById('address').value = 'CEP Not Founded';
        }else {
            completeForm(address);
        }
    }else{
        document.getElementById('address').value = 'Incorect CEP!';
    }
     
}

document.getElementById('cep')
        .addEventListener('focusout',findCep);