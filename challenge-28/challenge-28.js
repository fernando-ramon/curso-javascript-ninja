(function () {

    'use strict';
    /*
    No HTML:
    - Crie um formulário com um input de texto que receberá um CEP e um botão
    de submit;
    - Crie uma estrutura HTML para receber informações de endereço:
    "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
    preenchidas com os dados da requisição feita no JS.
    - Crie uma área que receberá mensagens com o status da requisição:
    "Carregando, sucesso ou erro."

    No JS:
    - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
    deve ser limpo e enviado somente os números para a requisição abaixo;
    - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
    "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
    no input criado no HTML;
    - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
    com os dados recebidos.
    - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
    a mensagem: "Buscando informações para o CEP [CEP]..."
    - Se não houver dados para o CEP entrado, mostrar a mensagem:
    "Não encontramos o endereço para o CEP [CEP]."
    - Se houver endereço para o CEP digitado, mostre a mensagem:
    "Endereço referente ao CEP [CEP]:"
    - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
    adicionar as informações em tela.
    */

    var $filtroCep = document.querySelector('[data-js="filtroCep"]');
    var $buscarCep = document.querySelector('[data-js="buscarCep"]');
    var $status = document.querySelector('[data-js="status"]');
    var $logradouro = document.querySelector('[data-js="logradouro"]');
    var $bairro = document.querySelector('[data-js="bairro"]');
    var $estado = document.querySelector('[data-js="estado"]');
    var $cidade = document.querySelector('[data-js="cidade"]');
    var $cep = document.querySelector('[data-js="cep"]');
    var xhttp = new XMLHttpRequest();
    var cep = '';

    xhttp.addEventListener('readystatechange', callback);

    $buscarCep.addEventListener('click', buscarCep, false);
    $filtroCep.addEventListener('change', limparCep, false);

    function buscarCep(event) {
        event.preventDefault();

        if (cep && cep !== '') {
            xhttp.open("GET", "https://viacep.com.br/ws/" + cep + "/json/", true);
            xhttp.send();
        } else {
            $status.value = 'Insira um Cep Valido';
        }

    }

    function limparCep(event) {
        cep = this.value.replace(/\D+/g, '');
    }

    function callback() {
        $status.value = 'Buscando informações para o CEP ' + cep + '...';
        if (this.readyState == 4) {
            if (this.status == 200) {
                var dadosEndereco = JSON.parse(this.responseText);
                if (dadosEndereco.erro) {
                    $status.value = 'Não encontramos o endereço para o CEP ' + cep + '.';    
                    limparDadosCep();
                } else {
                    preencheDadosCep(dadosEndereco);
                    $status.value = 'Endereço referente ao CEP ' + cep + ':'
                }
            } else {
                $status.value = 'Não encontramos o endereço para o CEP ' + cep + '.';
                limparDadosCep();
            }
        } 
    };

    function preencheDadosCep(dadosCep) {
        $logradouro.value = dadosCep.logradouro;
        $bairro.value = dadosCep.bairro;
        $estado.value = dadosCep.uf;
        $cidade.value = dadosCep.localidade;
        $cep.value = dadosCep.cep;
    }

    function limparDadosCep() {
        $logradouro.value = '';
        $bairro.value = '';
        $estado.value = '';
        $cidade.value = '';
        $cep.value = '';
    }
})();