<template>
  <div class="auth-container">
    <h1>Acesse sua Conta</h1>
    <form @submit.prevent="doLogin">
      <input v-model="email" type="email" placeholder="Seu e-mail" required>
      <input v-model="senha" type="password" placeholder="Sua senha" required>
      <button type="submit">Entrar</button>
    </form>
    <p>Não tem uma conta? <router-link to="/register">Cadastre-se</router-link></p>
  </div>
</template>

<script>
import api from '@/services/api.js';
export default {
  data() {
    return { email: '', senha: '' };
  },
  methods: {
    async doLogin() {
      try {
        const response = await api.post('/auth/login', {
          email: this.email,
          senha: this.senha
        });
        localStorage.setItem('authToken', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        alert('Erro: ' + error.response.data.error);
      }
    }
  }
}
</script>