import {useState} from 'react';
import Button from './Buttton';
import {useAddToCart} from '../../hooks/cart';


function AddToCartWidget({productId}) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useAddToCart();
    const handleClick = async () => {
        const response = await addToCart(productId, quantity)
    }
    return (
        <div>
            <input type="number" min="1"
            className="border rounded px-3 py-1 mr-2 w-16 text-right"
            value={quantity.toString()}
            onChange={(event) => setQuantity(parseInt(event.target.value))}
            />
            <Button onClick={handleClick}>
                Add to Cart
            </Button>
        </div>
    )
}

export default AddToCartWidget;