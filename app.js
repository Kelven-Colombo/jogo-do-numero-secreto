// Seleção dos elementos do DOM:
const telaConfig = document.querySelector("#telaConfig");
const telaChute = document.querySelector("#telaChute");
const btnConfirma = document.querySelector("#btnConfirma");
const btnVerificaChute = document.querySelector("#btnVerificaChute");
const btnReiniciarJogo = document.querySelector("#btnReiniciarJogo");
const inputMin = document.querySelector("#min");
const inputMax = document.querySelector("#max");
const inputChute = document.querySelector("#inputChute");
const listaInputs = document.querySelectorAll("input");

// Estado da aplicação:
const jogo = {
  min: 0,
  max: 0,
  numeroAleatorio: 0,
  chute: 0,
  tentativas: 1,
};


// Funções de exibição
function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.textContent = texto;
  falaTexto(texto);
}

function falaTexto(texto){
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });
}

function exibirMensagemInicial() {
  exibirTextoNaTela("#tituloConfig", `Jogo do Número Secreto`);
  exibirTextoNaTela("#textoConfig", `Defina o número mínimo e o máximo:`);
}

function exibirTelaChute(jogo){
  exibirTextoNaTela("#tituloChute",`Tente advinhar o número secreto:`);
  exibirTextoNaTela("#textoChute",`Digite um número entre ${jogo.min} e ${jogo.max}`);
  telaConfig.classList.add("hidden");
  telaChute.classList.remove("hidden");
  btnConfirma.disabled = true;
  btnVerificaChute.disabled = false;
  inputChute.focus();
}

function atualizarTelaChute(jogo){
  let palavraTentativa = jogo.tentativas > 1 ? "tentativas" : "tentativa";
  //caso acerto
  if (jogo.numeroAleatorio === jogo.chute) {
    exibirTextoNaTela("#tituloChute", `Parabéns! Você acertou.`);
    exibirTextoNaTela("#textoChute",`Você descobriu o número secreto: ${jogo.numeroAleatorio} com ${jogo.tentativas} ${palavraTentativa}`);
    exibirTextoNaTela("#labelChute","");
    btnReiniciarJogo.disabled = false;
    btnVerificaChute.disabled = true;
    inputChute.disabled = true;
    btnReiniciarJogo.focus();
  } else {
    //caso numero maior
    if (jogo.numeroAleatorio > jogo.chute) {
      exibirTextoNaTela("#tituloChute", `Errou!`);
      exibirTextoNaTela("#textoChute",`O número secreto é maior que ${jogo.chute}`);
      exibirTextoNaTela("#labelChute", `Chute um número entre ${jogo.min} e ${jogo.max}`);
    } else {
      //caso numero menor
      exibirTextoNaTela("#tituloChute", `Errou!`);
      exibirTextoNaTela("#textoChute",`O número secreto é menor que ${jogo.chute}`,
      );
      exibirTextoNaTela("#labelChute",`Chute um número entre ${jogo.min} e ${jogo.max}`);
    }
    jogo.tentativas++;
    inputChute.value = "";
  }
}

function limparTelaChute() {
  exibirTextoNaTela("#tituloChute", "");
  exibirTextoNaTela("#textoChute", "");
  exibirTextoNaTela("#labelChute", "");
}

function reiniciarJogo(jogo) {
  limparTelaChute();
  listaInputs.forEach((input) => {
    input.value = "";
  });

  jogo.min = 0;
  jogo.max = 0;
  jogo.numeroAleatorio = 0;
  jogo.chute = 0;
  jogo.tentativas = 1;

  btnReiniciarJogo.disabled = true;
  btnVerificaChute.disabled = true;
  btnConfirma.disabled = false;
  telaConfig.classList.remove("hidden");
  telaChute.classList.add("hidden");
  inputChute.disabled = false;
  exibirMensagemInicial();
  inputMin.focus();
}

//Funções de Controle
function iniciarJogo() {
  exibirMensagemInicial();
  inputMin.focus();
}

iniciarJogo();

function controleFluxoInicial(jogo){
  const min = parseInt(inputMin.value);
  const max = parseInt(inputMax.value);

  if (validarRange(min, max)){
    jogo.min = min;
    jogo.max = max;
    preparaJogo(jogo);
  } else{
    exibirTextoNaTela("#tituloConfig", `ATENÇÃO`);
    exibirTextoNaTela("#textoConfig",`"Digite apenas números válidos! Certifique-se de que o mínimo seja menor que o máximo. Tente novamente."`);
    inputMin.value = "";
    inputMax.value = "";
    inputMin.focus();
    return;
  }
}

function controleFluxoChute(jogo){
  const chute = parseInt(inputChute.value);
  const min = jogo.min;
  const max = jogo.max;

  if(validarChute(chute, min, max)){
    jogo.chute = chute;
    atualizarTelaChute(jogo);
  } else {
    exibirTextoNaTela("#tituloChute", `ATENÇÃO`);
    exibirTextoNaTela("#textoChute",`Digite um número entre ${jogo.min} e ${jogo.max}. Tente Novamente`);
    exibirTextoNaTela("#labelChute","");
    inputChute.value = "";
    inputChute.focus();
  }
   
}

//Funções de lógica
function validarRange(min, max){
  if (isNaN(min) || isNaN(max) || min >= max) {
    return false;
  } else{
    return true;
  }
}

function gerarNumeroAleatorio(min, max) {
  const numeroLimite = max - min + 1;
  const numeroAleatorio = Math.floor(Math.random() * numeroLimite + min);
  return numeroAleatorio;
  }

function preparaJogo(jogo){
  jogo.numeroAleatorio = gerarNumeroAleatorio(jogo.min, jogo.max);
  exibirTelaChute(jogo);
}

function validarChute(chute, min, max){
  if (isNaN(chute) || chute < min || chute > max) {
    return false;
  } else {
    return true;
  }
}

// Eventos
btnConfirma.addEventListener("click", () => controleFluxoInicial(jogo));
btnVerificaChute.addEventListener("click", () => controleFluxoChute(jogo));
btnReiniciarJogo.addEventListener("click", () => reiniciarJogo(jogo));

const acoesDoEnter = {
  min: () => inputMax.focus(),
  max: () => controleFluxoInicial(jogo),
  inputChute: () => controleFluxoChute(jogo)
};

listaInputs.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const executarAcao = acoesDoEnter[input.id];
      if (executarAcao) {
        executarAcao();
      }
    }
  });
});