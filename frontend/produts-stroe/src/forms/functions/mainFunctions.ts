import { FormEvent } from "react";

export const handleSubmitFormForPostRquest = (
    e: FormEvent<HTMLFormElement>,
    setModalDisplay: Function,
    dispatch: Function,
    token: string | undefined,
    asyncThunk: Function,
    selectedCategories?: string[],
) => {
    const formData = new FormData(e.currentTarget);

    if (selectedCategories) {
        /*loop over selected categories  
    and add it to the the form data */
        selectedCategories.forEach((category) => {
            formData.append('category', category)
        })
    }

    dispatch(asyncThunk({ productData: formData, headers: { 'Authorization': `Bearer ${token}` } }))
    setModalDisplay(true)
    setTimeout(() => {
        setModalDisplay(false)
    }, 1500)
}