import { useAppSelector } from "../app/hooks/hooks";

const SuccessOrder = () => {
    const shoppingCardSlice = useAppSelector((state) => state.shoppingCardCounter.itemCount)
    const products = useAppSelector((state) => state.productsSlice.products);

    const userItems = products.filter(product => shoppingCardSlice.includes(product._id));

    const quantities = userItems.map(product => ({
        ...product,
        quantity: shoppingCardSlice.filter(item => item === product._id).length,
    }));

    return (
        <div className="container mx-auto p-4">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Your order has been placed successfully.</span>
        </div>

        <div className="mt-4 p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quantities.map((item) => (
                    <div key={item._id} className="flex items-center space-x-4 border-b pb-4">
                        <img src={`/public/${item.productImg}`} alt={item.name} className="w-24 h-24 object-cover rounded-md shadow-md" />
                        <div>
                            <p><span className="font-semibold">Item:</span> {item.name}</p>
                            <p><span className="font-semibold">Price:</span> ${item.price.toFixed(2)}</p>
                            <p><span className="font-semibold">Category:</span> {item.category}</p>
                            <p><span className="font-semibold">Quantity:</span> {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>      
    );
};

export default SuccessOrder;
