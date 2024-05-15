import dotenv from 'dotenv'
dotenv.config()
import express  from 'express'
import cors from 'cors'
import connectdb from './config/connectdb.js'


const app = express();
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

//cors policy
app.use(cors())


//DATA CONNECTING
connectdb(DATABASE_URL)

//JSON
app.use(express.json())


app.listen(PORT, ()=>{
    console.log(`server is listening at https://localhost:${PORT}`)
})