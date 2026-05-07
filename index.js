const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.static('public'));  

mongoose.connect('mongodb://127.0.0.1:27017/tasksDB')
    .then(() => console.log('MongoDB ligado'))
    .catch(err => console.log(err));

app.use(express.json());

const taskRoutes = require('./routes/tasks');

app.get('/', (req, res) => {
    res.send('API a funcionar');
});

app.use('/tasks', taskRoutes);

app.listen(3000, () => {
    console.log('Servidor a correr na porta 3000');
});

