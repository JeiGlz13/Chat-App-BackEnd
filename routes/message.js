import express from 'express';
import messageController from '../controllers/message.js';

const router = express.Router();

// Definicion de rutas de la aplicacion
router.post('/save', messageController.save);
router.get('/getMessages', messageController.getMessages);

export default router;
