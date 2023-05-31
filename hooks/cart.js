import { useMutation } from 'react-query';
import { fetchJson } from '../lib/api';
const USE_QUERY_KEY = 'cart';

export function useAddToCart() {
    // const queryClient = useQueryClient();
    const mutation = useMutation(async ({product, quantity}) => 
    fetchJson('/api/cart',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ product, quantity })
        }));
        return {
            addToCart: async (product,quantity) => {
                try {
                    const cartAdd = await mutation.mutateAsync({product, quantity});
                    queryClient.setQueryData(USE_QUERY_KEY,cartAdd);
                    return true;
                } catch (err) {
                    return false;
                }
            },
            cartError: mutation.isError,
            cartLoading: mutation.isLoading
        }
}