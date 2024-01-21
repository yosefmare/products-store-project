import axios from 'axios';

type Headers = Record<string, string | string[]>;

export const createEntity = async (path: string, info: any, headers?: Headers): Promise<any> => {
    try {
        const res = await axios.post(path, info, {headers})
        return res
    } catch (err) {
        console.log(err);
        return err
    }
}

export const getAllEntity = async (path: string): Promise<any> => {
    try {
        const res = await axios.get(path)
        return res
    } catch (err) {
        console.log(err);
        return err
    }
}