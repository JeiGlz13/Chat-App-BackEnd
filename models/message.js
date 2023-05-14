import mongoose from 'mongoose';

const schema = mongoose.Schema;

const messageSchema = new schema({
    message: String,
    from: String,
    createdAt: Date,
});

export default mongoose.model('message', messageSchema);