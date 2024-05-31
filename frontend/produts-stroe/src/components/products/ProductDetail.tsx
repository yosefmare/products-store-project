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
        <div className="grid grid-cols-2">
            <div>
                <img src={`../../../public/${product.productImg}`} alt={product.name} />
            </div>
            <div>
                <h1>{product.name}</h1>
                <p>{product.price}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
