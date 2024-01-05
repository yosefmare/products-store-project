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
        const { user, token } = userData
        const userInfo = JSON.stringify({ userName: user.userName, profileImg: user.profileImg })
        localStorage.setItem('userInfo', userInfo)
        if (token) {
            const userToken = JSON.stringify({ token })
            localStorage.setItem('token', userToken)
        }
    }
}

export const getUserDataFromLocalStorage = () => {
    const userDataFomLocalStorage = localStorage.getItem('userInfo')
    const token = localStorage.getItem('token')
    if (userDataFomLocalStorage && token) {
        const parsedUserData = JSON.parse(userDataFomLocalStorage)
        const parsedToken = JSON.parse(token)
        return { ...parsedUserData, token: parsedToken }
    }
}