import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import MessagePopup from "../../ui-models/MessagePopup";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import Spinner from "../../ui-models/Spinner";
import { submitcustomerForms } from "../functions/forms.submite";
import { createCustomer } from "../../features/api/customersAsyncThunk.api";
import { useNavigate } from "react-router-dom";

const CreateCustomer = () => {
    const [modalDisplay, setModalDisplay] = useState<boolean>(false);
    const customersState = useAppSelector((state) => state.customersSlice)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (customersState.success || customersState.error) {
            setModalDisplay(true)
            setTimeout(() => {
                setModalDisplay(false);
            }, 2000)
        }

        if (customersState.success) {
            navigate('/purchases/successOrder')
        }
    }, [customersState.error, customersState.success])

    return (
        <>
            {customersState.error ?
                <MessagePopup
                    icon={<AiFillCloseCircle
                        className="text-3xl"
                    />}
                    message={customersState.error}
                    visibility={modalDisplay}
                />
                :
                <MessagePopup
                    icon={<AiFillCheckCircle
                        className="text-3xl"
                    />}
                    message={customersState.success}
                    visibility={modalDisplay}
                />
            }

            <Spinner visibility={customersState.loading} />
            <form className="form" encType='multipart/form-data' onSubmit={(e) => {
                e.preventDefault();
                submitcustomerForms(e, createCustomer, dispatch)
            }}>
                <h2 className="form-title">Create Customer</h2>
                <div className="outline-form-input">
                    <input required className="input-form" placeholder="" name="firstName" type="text" />
                    <label className="input-form-label" htmlFor="firstName">First Name</label>
                </div>

                <div className="outline-form-input">
                    <input required className="input-form" placeholder="" name="lastName" type="text" />
                    <label className="input-form-label" htmlFor="lastname">Last Name</label>
                </div>

                <div className="outline-form-input">
                    <input required className="input-form" placeholder="" name="city" type="text" />
                    <label className="input-form-label" htmlFor="city">City</label>
                </div>
                <div className=' flex items-center justify-center'>
                    <button className='btn' type='submit'>Add Customer</button>
                </div>
            </form>
        </>
    );
};

export default CreateCustomer;