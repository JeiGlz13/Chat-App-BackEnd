import Message from '../models/message.js';

const controller = {
    save: (req, res) => {
        const params = req.body;
        const message = new Message();
        message.message = params.message;
        message.from = params.from;
        message.createdAt = Date.now();

        message.save((error, messageStored) => {
            if (error || !messageStored) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Error al guardar los datos en la BD',
                })
            }

            return res.status(200).send({
                status: 'Success',
                messageStored,
            })
        })
    },
    getMessages: (req, res) => {
        const query = Message.find({});
        query.sort('-_createdAt').exec((error, messages) => {
            if (error) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al obtener los datos',
                })
            }

            if (!messages) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se han encontrado mensajes',
                });
            }

            return res.status(200).send({
                status: 'Success',
                messages,
            })
        });
    },
}

export default controller;
