<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Minha Clínica</h1>
      <button @click="doLogout">Sair</button>
    </header>
    <main class="dashboard-main">
      <h2 v-if="userRole === 'secretario'">Painel Administrativo - Agendamentos</h2>
      <h2 v-else>Meus Agendamentos</h2>
      
      <AppointmentForm @new-appointment="fetchAppointments" />

      <div class="appointments-list">
        <h3>Lista de Agendamentos</h3>
        <ul v-if="appointments.length > 0">
          <li v-for="app in appointments" :key="app._id">
            <div class="app-info">
              <strong v-if="userRole === 'secretario' && app.pacienteId">Paciente: {{ app.pacienteId.nome }}<br></strong>
              <strong>Data:</strong> {{ new Date(app.data).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) }} <br>
              <strong>Descrição:</strong> {{ app.descricao }} <br>
              <strong>Endereço:</strong> {{ app.enderecoCompleto }} <br>
              <strong>Previsão:</strong> 🌡️ {{ app.previsaoDoTempo }}
            </div>
            <div class="app-actions" v-if="userRole === 'secretario'">
              <button @click="deleteAppointment(app._id)" class="action-btn delete-btn">Excluir</button>
            </div>
          </li>
        </ul>
        <p v-else>Nenhum agendamento encontrado.</p>
      </div>
    </main>
  </div>
</template>

<script>
import api from '@/services/api';
import AppointmentForm from '@/components/AppointmentForm.vue';

export default {
  components: { AppointmentForm },
  data() { return { appointments: [], userRole: 'paciente' }; },
  created() { this.fetchAppointments(); },
  methods: {
    doLogout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
    },
    async fetchAppointments() {
      try {
        const response = await api.get('/appointments');
        this.appointments = response.data;
        if (this.appointments.length > 0) {
          if (this.appointments[0].pacienteId && this.appointments[0].pacienteId.nome) {
            this.userRole = 'secretario';
          } else {
            this.userRole = 'paciente';
          }
        }
      } catch (error) { this.doLogout(); }
    },
    async deleteAppointment(id) {
      if (confirm('Tem certeza que deseja excluir este agendamento?')) {
        try {
          await api.delete(`/appointments/${id}`);
          alert('Agendamento excluído com sucesso!');
          this.fetchAppointments();
        } catch (error) {
          alert('Erro ao excluir: ' + error.response.data.error);
        }
      }
    }
  }
}
</script>

<style>
.dashboard-container { width: 100vw; }
.dashboard-main { max-width: 800px; margin: 0 auto; padding: 100px 20px; box-sizing: border-box;}
.appointments-list ul { list-style: none; padding: 0; }
.appointments-list li { background: white; padding: 15px; border-radius: 8px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; }
.app-info { flex-grow: 1; }
.app-actions { display: flex; flex-direction: column; margin-left: 15px; }
.action-btn { padding: 5px 10px; font-size: 0.8em; margin-top: 5px; border-radius: 4px; text-align: center; border: none; cursor: pointer; color: white; text-decoration: none; }
.delete-btn { background-color: #ef4444; }
</style>