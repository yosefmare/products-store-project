
import { connect } from 'mongoose'

const dbConnection = async (): Promise<void> => {
connect(process.env.DB_URL)
.then(() => console.log('DB connect successfully'))
.catch((error) => console.log(error))
}

export default dbConnection