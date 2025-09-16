const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    data: { type: Date, required: true },
    descricao: { type: String, required: true },
    cep: { type: String, required: true },
    enderecoCompleto: { type: String },
    previsaoDoTempo: { type: String } // Campo atualizado
});

module.exports = mongoose.model('Appointment', AppointmentSchema);