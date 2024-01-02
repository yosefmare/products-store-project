import auth from './users/login-and-register'
import usersCruds from './users/users-crud-oparations'
import purchasesCrudOperations from './perchases/purchases-crud-oparations'
import customersCruds from './customers/customrs-crud-oparations'
import productsCruds from './products/products-crud-oparations'
import { Router } from 'express'

const router = Router()

router.use(auth)
router.use(usersCruds)
router.use(purchasesCrudOperations)
router.use(customersCruds)
router.use(productsCruds)

export default router