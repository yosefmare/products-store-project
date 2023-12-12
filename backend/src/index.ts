import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/db_connection'
import Registration from './routes/regitration'
import Login from './routes/login'

dotenv.config({ path: './config.env' })

dbConnection()

const register = new Registration()
const login = new Login()

const port: number = parseInt(process.env.PORT || "3000") 
const app = express()

app.use(express.json())

app.use('/', register.router)
app.use('/', login.router)

app.listen(port, () => {
    console.log(`the server is running on port: ${port}`);
})