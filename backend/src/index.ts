import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/db_connection'
import auth from './routes/users/login-and-register'
import UsersCrudOperations from './routes/users/users-crud-oparations'
import purchasesCrudOperations from './routes/perchases/purchases-crud-oparations'
import CustomersCrudOperations from './routes/customers/customrs-crud-oparations'
import ProductsCrudOperations from './routes/products/products-crud-oparations'
import cors from 'cors'

dotenv.config({ path: './config.env' })

dbConnection()

const port: number = parseInt(process.env.PORT || "3000")
const app = express()
const usersCruds =  UsersCrudOperations
const customersCruds =  CustomersCrudOperations
const productsCruds =  ProductsCrudOperations

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use('/auth', auth)
app.use('/users', usersCruds)
app.use('/customers', customersCruds)
app.use('/purchases',purchasesCrudOperations )
app.use('/products', productsCruds)

app.listen(port, () => {
    console.log(`the server is running on port: ${port}`);
})