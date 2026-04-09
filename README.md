# 🕹️ Jogo do Número Secreto - Pro Edition

> **Status:** Projeto refatorado para aplicação de conceitos de arquitetura e UX.

> 🔗 **[Acessar a demo do projeto ▶️](https://kelven-colombo.github.io/jogo-do-numero-secreto/)**


## ℹ️ Sobre
Originalmente desenvolvido nos cursos de lógica da **Alura**, este projeto foi totalmente reconstruído por mim para transformar um script simples em uma aplicação modular e com foco total na experiência do usuário (UX) incluindo interações via teclado.

### Objetivo
Um jogo de adivinhação onde o usuário define seu próprio intervalo de números (mínimo e máximo). O desafio é descobrir o número secreto com o menor número de tentativas, utilizando feedback visual e sonoro.

---

## Upgrades e Refatoração (V2.0):

Nesta revisão, apliquei padrões de **Clean Code** e **UX Design**, separando as responsabilidades do código:

* **Arquitetura Modular:** Refiz e separei as funções em camadas: **Validação** (conferência de dados), **Lógica de Negócio** (geração de números e cálculo de tentativas) e **Interface/UI** (manipulação do DOM). O que tornou o código mais fácil de ler, manter e escalar.

* **Gerenciamento de Fluxo (Single Page Application):** Implementei uma lógica de troca de telas dinâmica. O jogo alterna entre a "Tela de Configuração" e a "Tela de Jogo" manipulando classes CSS, sem a necessidade de recarregar a página ou criar arquivos HTML extras.

* **Navegação 100% via Teclado (Acessibilidade):** Adicionei o método `.focus()`. Ao dar "Enter", o cursor pula automaticamente para o próximo campo ou botão. O usuário consegue configurar o range, chutar e reiniciar o jogo sem encostar no mouse.

* **Dicionário de Ações (Event Mapping):** Em vez de múltiplos listeners repetitivos, implementei um objeto de mapeamento para as teclas. O JavaScript identifica o `ID` do input ativo e executa a ação correspondente, melhorando a escalabilidade do codigo.

* **Funções Puras e Retorno de Dados:** Refatorei a lógica de sorteio para que ela seja independente do estado global. A função recebe parâmetros e retorna o resultado, seguindo boas práticas de programação funcional que facilitam testes unitários e a reutilização de funções.

---

## Tecnologias
<div>
  <img src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
</div>

---

## 👤 Autor

<div align="center">
  <a href="https://github.com/Kelven-Colombo">
    <img src="https://github.com/Kelven-Colombo.png" alt="Kelven Colombo" width="150">
  </a>
  <br><br>
  <a href="https://github.com/Kelven-Colombo">
    <img src="https://img.shields.io/badge/Autor-Kelven%20Colombo-blue?style=for-the-badge&logo=github">
  </a>
</div>
