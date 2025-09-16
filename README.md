# Sistema de Atendimento Inteligente para Clínicas Médicas

Este projeto é uma aplicação web full-stack desenvolvida para a disciplina [AVA 2]. O sistema gerencia o agendamento de consultas médicas, com autenticação de usuários, integração com APIs externas para busca de endereço (ViaCEP) e previsão do tempo em tempo real (OpenWeatherMap).

## 🚀 Link para o Projeto Online

**A aplicação pode ser acessada em:** [https://sistema-clinica-vue-node.vercel.app/](https://sistema-clinica-vue-node.vercel.app/)

## ✨ Funcionalidades Implementadas

- ✅ **Autenticação Segura:** Cadastro e Login de usuários (Pacientes e Secretários) com senhas criptografadas e tokens JWT.
- ✅ **Verificação de Horário:** O sistema impede que duas consultas sejam marcadas no mesmo dia e horário.
- ✅ **Painel Administrativo:** Usuários com função "Secretário" podem visualizar e excluir os agendamentos de todos os pacientes.
- ✅ **API de Endereço (ViaCEP):** O endereço do agendamento é preenchido automaticamente a partir do CEP.
- ✅ **API de Clima (OpenWeatherMap):** Exibição da previsão do tempo real (temperatura e condição) para o dia da consulta.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** Vue.js 3, Vue Router, Axios
- **Backend:** Node.js, Express.js
- **Banco de Dados:** MongoDB (com Mongoose e MongoDB Atlas)
- **Autenticação:** JSON Web Tokens (JWT) e bcrypt.js

## 🚀 Logins para Teste

Para facilitar a avaliação, foram criados dois usuários com perfis diferentes:

### 1. Visão do Paciente
- **Email:** `paciente.teste@email.com`
- **Senha:** `123456`
- *Ao logar com este usuário, você verá o painel de um paciente comum, que pode criar e visualizar apenas os seus próprios agendamentos.*

### 2. Visão do Secretário (Administrador)
- **Email:** `secretario.teste@email.com`
- **Senha:** `123456`
- *Ao logar com este usuário, você terá acesso ao painel administrativo, podendo visualizar os agendamentos de **todos** os pacientes, além de poder excluí-los.*

## 💻 Como Executar Localmente

**Pré-requisitos:** [Node.js](https://nodejs.org/) (v18+) e [Vue CLI](https://cli.vuejs.org/).

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/rafael9195/sistema-clinica-vue-node.git](https://github.com/rafael9195/sistema-clinica-vue-node.git)
    cd clinica-inteligente
    ```

2.  **Configure o Backend (em um terminal):**
    ```bash
    cd backend
    npm install
    ```
    - Crie um arquivo `.env` e adicione as variáveis `MONGO_URI`, `JWT_SECRET` e `WEATHER_API_KEY`.
    ```bash
    node server.js
    ```

3.  **Configure o Frontend (em outro terminal):**
    ```bash
    cd frontend
    npm install
    npm run serve
    ```

A aplicação estará disponível em `http://localhost:8080`.

---
_Projeto desenvolvido por: Rafael._