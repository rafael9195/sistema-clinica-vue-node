<template>
  <div class="auth-container">
    <h1>Crie sua Conta</h1>
    <form @submit.prevent="doRegister">
      <input v-model="nome" type="text" placeholder="Nome completo" required>
      <input v-model="email" type="email" placeholder="Seu melhor e-mail" required>
      <input v-model="senha" type="password" placeholder="Crie uma senha" required>
      <button type="submit">Cadastrar</button>
    </form>
    <p>Já tem uma conta? <router-link to="/login">Faça Login</router-link></p>
  </div>
</template>

<script>
import api from '@/services/api.js';
export default {
  data() {
    return { nome: '', email: '', senha: '' };
  },
  methods: {
    async doRegister() {
      try {
        await api.post('/auth/register', {
          nome: this.nome,
          email: this.email,
          senha: this.senha
        });
        alert('Cadastro realizado com sucesso! Agora você pode fazer o login.');
        this.$router.push('/login');
      } catch (error) {
        alert('Erro: ' + error.response.data.error);
      }
    }
  }
}
</script>