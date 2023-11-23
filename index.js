import express from 'express';
import dotenv from 'dotenv';
import AppRouters from './src/routes/index.js'
import cors from 'cors'
dotenv.config();

const PORT= process.env.PORT;

const app=express();
app.use(cors())
app.use(express.json());
app.use('/', AppRouters)

app.listen(PORT,()=>console.log(`App listenting port with ${PORT}`));
