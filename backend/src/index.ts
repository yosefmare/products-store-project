import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/db_connection'
dotenv.config({ path: './config.env' })

dbConnection()

const port: number = parseInt(process.env.PORT || "3000") 
const app = express()

app.get('/', (req, res) => {
    res.send('hello to the root!!!!!!!')
})

app.listen(port, () => {
    console.log(`the server is running on port: ${port}`);
})