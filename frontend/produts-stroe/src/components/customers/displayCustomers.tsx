import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { useEffect } from "react";
import { getAllCustomers } from "../../features/api/customersAsyncThunk.api";
import Spinner from "../../ui-models/Spinner";

const DisplayCustomers = () => {
const customersState = useAppSelector((state) => state.customersSlice)
const dispatch = useAppDispatch()

useEffect(() => {
dispatch(getAllCustomers())
}, [dispatch])

    return (
        <>
        <Spinner visibility={customersState.loading}/>
        <div className="container mx-auto mt-10">
            <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-gray-300 md:border-none block md:table-row">
                        <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell text-center">
                            First Name
                        </th>
                        <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell text-center">
                            Last Name
                        </th>
                        <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell text-center">
                            City
                        </th>
                        <th className="bg-gray-200 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell text-center">
                            Order
                        </th>
                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                    {customersState.customers.map((customer) => (
                        <tr
                            key={customer._id}
                            className="bg-white border border-gray-300 md:border-none block md:table-row"
                        >
                            <td className="p-4 md:border md:border-gray-300 block md:table-cell text-center">
                                {customer.firstName}
                            </td>
                            <td className="p-4 md:border md:border-gray-300 block md:table-cell text-center">
                                {customer.lastName}
                            </td>
                            <td className="p-4 md:border md:border-gray-300 block md:table-cell text-center">
                                {customer.city}
                            </td>
                            <td className="p-4 md:border md:border-gray-300 block md:table-cell text-center">
                                <Link to={''} className="btn">
                                    Show Order
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default DisplayCustomers;
