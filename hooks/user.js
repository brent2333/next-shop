import { useQuery, useQueryClient, useMutation } from 'react-query';
import { fetchJson } from '../lib/api';
const USE_QUERY_KEY = 'user';

export function useSignIn() {
    const queryClient = useQueryClient();
    const mutation = useMutation(async ({email, password}) => 
    fetchJson('/api/login',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        }));
        return {
            signIn: async (email,password) => {
                try {
                    const user = await mutation.mutateAsync({email, password});
                    queryClient.setQueryData(USE_QUERY_KEY,user);
                    return true;
                } catch (err) {
                    return false;
                }
            },
            signInError: mutation.isError,
            signinInLoading: mutation.isLoading
        }
}

export function useSignOut() {
    const queryClient = useQueryClient();
    const mutation = useMutation(() => fetchJson('/api/logout'));
    return async () => {
        await mutation.mutateAsync();
        queryClient.setQueryData(USE_QUERY_KEY,undefined);
    }
}

export function useUser() {
    const query = useQuery(USE_QUERY_KEY, async () => {
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