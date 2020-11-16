const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

app.get('/', (req, res) => {
  console.log('Hello World');
});

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
