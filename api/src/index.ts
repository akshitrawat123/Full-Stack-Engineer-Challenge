import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import resultRouter from './result.router';
import dotenv from 'dotenv';
import connectDB from './config/mongoose';

dotenv.config();

const app = express();

// Enable CORS and JSON request parsing
app.use(cors());
app.use(bodyParser.json());

// Connect to the MongoDB database
connectDB();

app.use('/results', resultRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
