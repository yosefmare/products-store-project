import { createEntity } from "../utils/utils";

type sendFormDataStateTypes = {
    userName?: string;
    email: string;
    password: string
    role?: string
}

export const sendFormData = async (url: string, state: sendFormDataStateTypes) => {
    const userData = await createEntity(url, state)
    if (userData) {
        console.log(userData);
        const { user } = userData
        const userInfo = JSON.stringify({ userName: user.userName, profileImg: user.profileImg })
        localStorage.setItem('userInfo', userInfo)
        localStorage.setItem('token', userData.token)
    }
}