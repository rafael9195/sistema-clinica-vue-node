<template>
  <div class="auth-container">
    <h1>Editar Agendamento</h1>
    <form @submit.prevent="handleUpdate" v-if="form">
      <label>Data e Hora:</label>
      <input type="datetime-local" v-model="form.data" required>
      <label>Descrição:</label>
      <input type="text" v-model="form.descricao" placeholder="Descrição" required>
      <label>CEP:</label>
      <input type="text" v-model="form.cep" placeholder="CEP" required>
      <button type="submit">Salvar Alterações</button>
      <router-link to="/dashboard" class="cancel-link">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      form: null,
    };
  },
  async created() {
    const appointmentId = this.$route.params.id;
    try {
      const response = await api.get(`/appointments/${appointmentId}`);
      // O input datetime-local precisa de um formato específico, então formatamos a data
      response.data.data = new Date(response.data.data).toISOString().slice(0, 16);
      this.form = response.data;
    } catch (error) {
      alert('Erro ao carregar dados do agendamento.');
      this.$router.push('/dashboard');
    }
  },
  methods: {
    async handleUpdate() {
      try {
        await api.put(`/appointments/${this.form._id}`, this.form);
        alert('Agendamento atualizado com sucesso!');
        this.$router.push('/dashboard');
      } catch (error) {
        alert('Erro ao atualizar: ' + error.response.data.error);
      }
    },
  },
};
</script>

<style scoped>
label { display: block; margin-bottom: 5px; font-weight: bold; }
.cancel-link { display: block; text-align: center; margin-top: 15px; }
</style>