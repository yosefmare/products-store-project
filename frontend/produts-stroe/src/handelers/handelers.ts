import { createEntity } from "../utils/utils";

interface sendFormDataStateTypes {
    userName?: string;
    email: string;
    password: string
    role?: string
}

interface UserDataTypes extends sendFormDataStateTypes {
    profileImg: string
}

export const sendFormData = async (url: string, state: sendFormDataStateTypes, navigates?: Function) => {
    try {
        const { data: userData, status } = await createEntity(url, state)
        if (navigates) {
            if (status === 200 || 201) {
                if (userData) {
                    console.log(userData);
                    setUserDataInLocalStorage(userData)
                    navigates('/products')
                }
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const setUserDataInLocalStorage = (userData: { user: UserDataTypes; token: string; }) => {
    const { user, token } = userData
    const userInfo = JSON.stringify({ userName: user.userName, profileImg: user.profileImg })
    localStorage.setItem('userInfo', userInfo)
    const userToken = JSON.stringify({ token })
    localStorage.setItem('token', userToken)

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