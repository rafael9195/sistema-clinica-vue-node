const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', AppointmentController.create);
router.get('/', AppointmentController.list);
router.delete('/:id', AppointmentController.delete); // Apenas a rota de deletar

module.exports = router;