<template>
    <form @submit.prevent="handleSubmit" class="appointment-form">
        <h3>Novo Agendamento</h3>
        <input type="datetime-local" v-model="form.data" required>
        <input type="text" v-model="form.descricao" placeholder="Descrição (ex: Retorno, Exames)" required>
        <input type="text" v-model="form.cep" placeholder="CEP (apenas números)" required maxlength="8">
        <button type="submit">Agendar</button>
    </form>
</template>

<script>
import api from '@/services/api';

export default {
    data() {
        return {
            form: { data: '', descricao: '', cep: '' }
        }
    },
    methods: {
        async handleSubmit() {
            try {
                await api.post('/appointments', this.form);
                alert('Agendamento criado com sucesso!');
                this.$emit('new-appointment');
                this.form = { data: '', descricao: '', cep: '' };
            } catch(error) {
                alert('Erro ao agendar: ' + error.response.data.error);
            }
        }
    }
}
</script>

<style>
.appointment-form { background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
</style>