require('dotenv').config(); 

import express, { json } from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';

const app = express();

app.use(json());
app.use(cors());

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});