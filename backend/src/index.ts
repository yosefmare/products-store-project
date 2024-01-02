import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/db_connection'
import routes from './routes/routes-index'
import cors from 'cors'

dotenv.config({ path: './config.env' })

dbConnection()

const port: number = parseInt(process.env.PORT || "3000")
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use(routes)

app.listen(port, () => {
    console.log(`the server is running on port: ${port}`);
})