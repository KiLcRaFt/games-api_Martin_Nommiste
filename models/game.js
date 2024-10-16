const mongoose = require('mongoose');

// Определение схемы для игр
const gameSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

// Создание модели на основе схемы
module.exports = mongoose.model('Game', gameSchema);