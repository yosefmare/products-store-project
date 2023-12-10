import { connect } from 'mongoose';

const dbConnection = async (): Promise<void> => {
    const dbUrl:string = process.env.DB_URL || 'mongodb://127.0.0.1:27017/products_store_DB';

    if (!dbUrl) {
        throw new Error('DB_URL is not defined in the environment variables.');
    }

    try {
        await connect(dbUrl);
        console.log('DB connected successfully');
    } catch (error) {
        console.error(error);
    }
};

export default dbConnection;
