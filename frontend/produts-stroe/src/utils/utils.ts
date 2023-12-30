import axios from 'axios';

type Headers = Record<string, string | string[]>;

export const createEntity = async (path: string, info: any, headers?: Headers): Promise<any> => {
    const { data } = await axios.post(path, info, headers)
    return data
}