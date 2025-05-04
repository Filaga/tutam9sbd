const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://filaga:iazgWHfqMKuFUX1G@filaga.2ebfpyi.mongodb.net/Tutam9SBD');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => console.log('Connected to MongoDB Filaga'));

app.post('/todos', async (req, res) => {
    const todo = new Todo({ text: req.body.text });
    const saved = await todo.save();
    res.json(saved);
});

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

app.listen(PORT, () => console.log(`🚀 Server started at port: ${PORT}`));
