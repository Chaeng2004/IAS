require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('Backend server is running securely!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});