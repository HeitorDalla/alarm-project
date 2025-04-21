"use strict";

// Função para formatar a data e hora utilizando closures
function formatClock () {
    const date = new Date();

    function formatDate () {
        const day = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
        const month = `${date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)}`;
        const year = `${date.getFullYear()}`;

        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    }
    function formatTime () {
        const time = `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}`;
        const minutes = `${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
        const seconds = `${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`;

        const formattedTime = `${time}:${minutes}:${seconds}`;

        return formattedTime;
    }

    return `${formatDate()} ${formatTime()}`;
};

// Função para iniciar alarme
function iniciarAlarme () {
    const campos = [...document.querySelectorAll(".info")];
    let resultado = [];

    mostrarAlarme();

    function mostrarAlarme () {
        campos.forEach((campo) => {
            const value = campo.querySelector("input").value; // Pegar o valor do input
            const numero = Number(value); // Transformar o valor em número

            if (numero === 0) {
                return;
            }

            const label = campo.querySelector("label").textContent.charAt(0).toLocaleLowerCase();

            resultado.push(`${value}${label}`);
        });

        const textoFormatado = resultado.join(" ");
        
        return tempoAlarme.textContent = textoFormatado;
    };

    iniciarContagem();

    function iniciarContagem () {
        let totalSegundos = 0; // Transformar todos os valores em segundas para uma maior facilidade na manipulação

        let dias = Number(document.querySelector("#dias").value);
        let horas = Number(document.querySelector("#horas").value);
        let minutos = Number(document.querySelector("#minutos").value);
        let segundos = Number(document.querySelector("#segundos").value);

        // Convertendo tudo para segundos
        

        // Atualiza a cada segundo
        const contagem = setInterval (() => {

        }, 1000);
    };
};

const containerDate = document.querySelector("#containerData");
const containerAlarme = document.querySelector("#containerAlarme");
const containerTempo = document.querySelector("#containerTempo");
const containerInfo = document.querySelector("#containerInfo");

const tempoAlarme = document.querySelector("#tempoAlarme");

// Delimitando que a cada segundo, o relogio formatará para o horário atual
const intervaloTempo = setInterval(() => {
    containerDate.innerHTML = formatClock();
}, 1000);

// Funcionalidades para o botão de definir alarme
const btnAlarme = document.querySelector("#btnAlarme");
btnAlarme.addEventListener("click", (event) => {
    event.preventDefault();

    // Zerando todos os valores quando eu clicar no button de alarme
    const campos = [...document.querySelectorAll(".info")];
    campos.forEach((campo) => {
        const input = campo.querySelector("input");
        input.value = '';
    });

    tempoAlarme.innerHTML = '';

    if ((containerInfo.style.display === 'none' || containerInfo.style.display === "") && (containerTempo.style.display === 'none' || containerTempo.style.display === "")) {
        containerInfo.style.display = 'block';
        containerTempo.style.display = 'block';
    } else {
        containerInfo.style.display = "none";
        containerTempo.style.display = 'none';
    }
});

// Funcionalidades do botão salvar
const salvar = document.querySelector("#salvar");
salvar.addEventListener("click", (event) => {
    event.preventDefault();
    let isValid = true;

    // Verificando se cada campo ja possui um valor
    const campos = [...document.querySelectorAll(".info")];
    campos.forEach((campo) => {
        // Se algo der errado, ja parar por aqui
        if (!isValid) {
            return;
        }

        const input = campo.querySelector("input").value.trim();

        if (input === '') {
            alert("Preencha todos os campos!");
            isValid = false;
            return;
        }

        const inputNumber = Number(input); // Conversão para número
        if (Number.isNaN(inputNumber)) {
            alert("O valor deve ser um número válido!");
            isValid = false;
            return;
        }

        if (inputNumber < 0) {
            alert("Não pode conter números negativos!");
            isValid = false;
            return;
        }
    });

    // Se tudo for válido, inicia a lógica do alarme
    if (isValid) {
        iniciarAlarme();
        containerInfo.style.display = 'none';
    }
});