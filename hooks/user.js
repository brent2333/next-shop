import { useQuery } from 'react-query';
import { fetchJson } from '../lib/api';

export function useUser() {
    const query = useQuery('user', async () => {
        try {
            return await fetchJson('/api/user');
           } catch(err) {
            // nothing to do, natural state
            return undefined
           }
    }, {
        staleTime: 30000,
        cacheTime: Infinity
    });
    return query.data;
}