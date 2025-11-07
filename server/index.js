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

// user routes
app.use('/api/users',require('./routes/userRoutes'))

app.use('/api/transection',require("./routes/transectionRoutes"))


//listning server
app.listen(process.env.PORT,()=>{
    console.log(`The server is running in the port ${process.env.PORT}`)

})


