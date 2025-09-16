const Appointment = require('../models/Appointment');
const User = require('../models/User');
const axios = require('axios');

// FUNÇÃO DE CRIAR
exports.create = async (req, res) => {
    try {
        const { data, descricao, cep } = req.body;
        const appointmentExists = await Appointment.findOne({ data: data });
        if (appointmentExists) {
            return res.status(400).send({ error: 'Este horário já está ocupado.' });
        }
        
        const viaCepResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (viaCepResponse.data.erro) {
            return res.status(400).send({ error: 'CEP não encontrado.' });
        }
        const endereco = `${viaCepResponse.data.logradouro}, ${viaCepResponse.data.bairro}, ${viaCepResponse.data.localidade} - ${viaCepResponse.data.uf}`;
        const cidade = viaCepResponse.data.localidade;

        let previsaoFinal = "Previsão indisponível";
        try {
            const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=pt_br`);
            const clima = weatherResponse.data;
            const descricaoClima = clima.weather[0].description;
            const temperatura = Math.round(clima.main.temp);
            previsaoFinal = `${descricaoClima}, com temperatura de ${temperatura}°C`;
        } catch (weatherError) {
            console.error("Erro ao buscar previsão do tempo:", weatherError.message);
        }

        const appointment = await Appointment.create({
            data, descricao, cep, enderecoCompleto: endereco, previsaoDoTempo: previsaoFinal, pacienteId: req.userId
        });

        return res.send(appointment);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao criar agendamento: ' + err.message });
    }
};

// FUNÇÃO DE LISTAR
exports.list = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        let appointments;
        if (user.role === 'secretario') {
            appointments = await Appointment.find().populate('pacienteId').sort({ data: 1 });
        } else {
            appointments = await Appointment.find({ pacienteId: req.userId }).sort({ data: 1 });
        }
        return res.send(appointments);
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao listar agendamentos' });
    }
};

// FUNÇÃO DE DELETAR
exports.delete = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role !== 'secretario') {
            return res.status(403).send({ error: 'Acesso negado. Apenas secretários podem deletar.' });
        }
        await Appointment.findByIdAndDelete(req.params.id);
        return res.send({ message: 'Agendamento deletado com sucesso' });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao deletar agendamento' });
    }
};