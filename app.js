import dotenv from 'dotenv'
dotenv.config()
import express  from 'express'
import cors from 'cors'
import connectdb from './config/connectdb.js'
import userrouter from './routes/userRoutes.js'




const app = express();
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

//cors policy
app.use(cors())


//DATA CONNECTING
connectdb(DATABASE_URL)

//JSON
app.use(express.json())

//load routes 
app.use("/api/user" , userrouter)


app.listen(PORT, ()=>{
    console.log(`server is listening at https://localhost:${PORT}`)
})