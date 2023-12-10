import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/db_connection'

dotenv.config({ path: './config.env' })

dbConnection()

const port: number = parseInt(process.env.PORT || "3000") 
const app = express()

app.use(express.json())

app.post('/signup', (req, res) => {
    res.status(201).json(req.body)
})

app.listen(port, () => {
    console.log(`the server is running on port: ${port}`);
})