const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função para gerar o token JWT que autentica o usuário
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '8h', // O token expira em 8 horas
    });
};

// Função para REGISTRAR um novo usuário
exports.register = async (req, res) => {
    const { email, nome, senha } = req.body;
    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'Este e-mail já está em uso.' });
        }
        const user = await User.create({ nome, email, senha });
        user.senha = undefined; // Remove a senha da resposta
        return res.send({ user, token: generateToken(user.id) });
    } catch (err) {
        return res.status(500).send({ error: 'Falha no registro.' });
    }
};

// Função para LOGAR um usuário
exports.login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await User.findOne({ email }).select('+senha');
        if (!user) {
            return res.status(404).send({ error: 'Usuário não encontrado.' });
        }
        if (!await bcrypt.compare(senha, user.senha)) {
            return res.status(400).send({ error: 'Senha incorreta.' });
        }
        user.senha = undefined;
        res.send({ user, token: generateToken(user.id) });
    } catch (err) {
        return res.status(500).send({ error: 'Falha no login.' });
    }
};