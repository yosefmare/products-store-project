const CreateCustomer = () => {
    return (
        <form className="form">
            <h2 className="form-title">Create Customer</h2>
            <div className="outline-form-input">
                <input className="input-form" placeholder="" name="firstName" type="text" />
                <label className="input-form-label" htmlFor="firstName">First Name</label>
            </div>

            <div className="outline-form-input">
                <input className="input-form" placeholder="" name="lastname" type="text" />
                <label className="input-form-label" htmlFor="lastname">Last Name</label>
            </div>

            <div className="outline-form-input">
                <input className="input-form" placeholder="" name="city" type="text" />
                <label className="input-form-label" htmlFor="city">City</label>
            </div>
            <div className=' flex items-center justify-center'>
                <button className='btn' type='submit'>Add Customer</button>
            </div>
        </form>
    );
};

export default CreateCustomer;