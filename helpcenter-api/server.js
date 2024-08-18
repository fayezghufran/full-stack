const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const cardRoutes = require('./routes/cards');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
  })); // Use cors middleware

// Replace <username>, <password>, and <dbname> with your actual MongoDB Atlas credentials
const mongoURI = 'mongodb+srv://fayezghufran8573:QAhrufQBd3XHC37s@help-center-db.1stes.mongodb.net/?retryWrites=true&w=majority&appName=help-center-db';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

app.get('/ping', (req, res) => {
  res.send('Server is running');
});

app.use('/cards', cardRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
