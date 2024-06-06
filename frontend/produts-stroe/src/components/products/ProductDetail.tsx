import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllEntity } from "../../utils/utils";
import { Products } from "../../features/ProductsSlice";

const ProductDetail = (): JSX.Element => {
    const [product, setProduct] = useState<Products | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const {data} = await getAllEntity(`http://localhost:8000/products/getProduct/${id}`);
if (data) {
    setProduct(data);
}
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        getProduct();
        console.log(id);
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img className="w-full h-full object-cover" src={`../../../public/${product.productImg}`} alt="" />
                </div>
                <div className="flex-mx-2 mb-4">
                    <div className="w-full px-2">
                        <button className="w-full btn">Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold">Price:</span>
                        <span> ${product.price}</span>
                    </div>  
                </div>  
                <div>
                    <span className="font-bold">Product Description:</span>
                    <p className="text-sm mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                        sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                        lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                        ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                        sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default ProductDetail;
