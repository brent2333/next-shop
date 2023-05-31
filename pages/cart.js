import Page from './Page';
import getCart from './api/cart';
import { useQuery } from 'react-query';
import { fetchJson } from '../lib/api';
import CartTable from './components/CartTable';
function CartPage() {
    const query = useQuery('cartItems', () => fetchJson('/api/cart'));
    const cartItems = query.data;
    console.log('cart items', cartItems);
    return (
        <Page title="Cart">
            {cartItems && <CartTable cartItems={cartItems} />}
        </Page>

    )
}

export default CartPage;