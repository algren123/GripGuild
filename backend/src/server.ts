import express, { Request, Response, Express } from 'express';
import * as dotenv from 'dotenv';
import app from './app';

const cors = require('cors');

dotenv.config();

app.use(express.json());
app.use(cors());

// Define a port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
