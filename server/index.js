const express=require('express');
const morgan=require('morgan')
const cors=require("cors")
const dotenv=require('dotenv')
const connectToDatabase=require('./config/db')

//setting up env variable
dotenv.config();

//database connection
connectToDatabase()

//
const app=express();

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes


