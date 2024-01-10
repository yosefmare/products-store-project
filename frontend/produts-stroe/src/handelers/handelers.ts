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

export const handelSendLoginAndRegisterFormData = async (url: string, state: sendFormDataStateTypes, navigates?: Function) => {
    try {
        const res = await createEntity(url, state)
        if (res) {
            const { data: userData, status, response} = res
            if (navigates) {
                if (status === 200 || 201) {
                    if (userData) {
                        console.log(userData);
                        setUserDataInLocalStorage(userData)
                        navigates('/products')
                    } 
                }{
                    return response
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

export const errorChecker = async (entity: Promise<any>, setState: Function) => {
    try {
        const error = await entity
        // check if the inputs filed are empty
        if (error) {
            const { data } = error
            const { errors } = data
            setState({ status: true, message: data.status })

// check if the user enter a valid email and password
            if (errors.email) {
                setState({ status: true, message: errors.email.message })
            } else if (errors.password) {
                setState({ status: true, message: errors.password.message })
            }
        }
    } catch (err) {
        console.log(err);
    }
}