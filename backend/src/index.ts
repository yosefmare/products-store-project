import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/db_connection'
import Registration from './routes/users/register'
import Login from './routes/users/login'
import UsersCrudOperations from './routes/users/users-crud-oparations'
import cors from 'cors'

dotenv.config({ path: './config.env' })

dbConnection()

const port: number = parseInt(process.env.PORT || "3000")
const app = express()
const signup = new Registration()
const login = new Login()
const usersCruds = new UsersCrudOperations()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use('/', signup.router)
app.use('/', login.router)
app.use('/', usersCruds.router)

app.listen(port, () => {
    console.log(`the server is running on port: ${port}`);
})