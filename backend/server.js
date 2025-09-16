// 1. Importa as ferramentas que vamos usar
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Carrega as variáveis do arquivo .env

// 2. Inicia o aplicativo Express
const app = express();

// 3. Configurações do App (Middlewares)
app.use(cors()); // Permite que nosso frontend (em outra porta) converse com o backend
app.use(express.json()); // Ensina o Express a entender o formato JSON

// 4. Conexão com o Banco de Dados MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// 5. Define as rotas da nossa aplicação
app.use('/auth', require('./src/routes/authRoutes'));

// ...
app.use('/auth', require('./src/routes/authRoutes'));
app.use('/appointments', require('./src/routes/appointmentRoutes')); // <<< ADICIONE ESTA LINHA
// ...

// 6. Define a porta e inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});