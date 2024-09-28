import { Link } from "react-router-dom";

const DisplayCustomers = () => {
    const customers = [
        { firstName: 'John', lastName: 'Doe', city: 'New York' },
        { firstName: 'Jane', lastName: 'Smith', city: 'Los Angeles' },
        { firstName: 'Alex', lastName: 'Johnson', city: 'Chicago' },
        { firstName: 'Maria', lastName: 'Garcia', city: 'Houston' }
    ];

    return (
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
                    {customers.map((customer, index) => (
                        <tr
                            key={index}
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
    );
};

export default DisplayCustomers;
