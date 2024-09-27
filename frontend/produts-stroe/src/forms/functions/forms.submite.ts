import { FormEvent } from "react";
import { auth } from "../../features/api/authAsyncThunk.api";

export const submitAuthForms = (
    endPoint: string,
    evemt: FormEvent<HTMLFormElement>,
    dispatch: Function
) => {
    const formData = new FormData(evemt.currentTarget);
    dispatch(auth({ endPoint, formData }))
}

export const submitcustomerForms = (
    event: FormEvent<HTMLFormElement>,
    customerAsyncThunk: Function,
    dispatch: Function
) => {
    const formData = new FormData(event.currentTarget);
    dispatch(customerAsyncThunk({ formData }))
}

export const submitproductForms = (
    event: FormEvent<HTMLFormElement>,
    productAsyncThunk: Function,
    dispatch: Function,
    selectedCategories?: string[]
) => {
    const formData = new FormData(event.currentTarget);

    /*loop over selected categories  
and add it to the the form data */
    if (selectedCategories) {
        selectedCategories.forEach((category) => {
            formData.append('category', category)
        })
    }
    dispatch(productAsyncThunk({ formData }))
}