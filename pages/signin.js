import Page from './Page';
import Input from './components/Input';
import Field from './components/Field';
import Button from './components/Buttton';
import {useState} from 'react';
import { fetchJson } from '../lib/api';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const queryClient = useQueryClient();
    const mutation = useMutation(async () => fetchJson('/api/login',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        }));

    const handleSubmit = async (event) => {
        console.log('handleSubmit');
        event.preventDefault();
        try {
            const user = await mutation.mutateAsync();
            queryClient.setQueryData('user',user);
            console.log('signin', user);
            router.push('/');
        } catch (err) {
        // mutation isError is true here
    }

    }
    return (
        <Page title="Sign in">
            <form onSubmit={handleSubmit}>
                <Field label="Email">
                    <Input type="email" required value={email}
                    onChange={(event) => setEmail(event.target.value)} />
                </Field>
                <Field label="Password">
                    <Input type="password" required value={password}
                    onChange={(event) => setPassword(event.target.value)} />
                </Field>
                {mutation.isError && <p className="text-red-700">Invalid Credentials</p>}
                {mutation.isLoading ? (
                    <p>Loading . . .</p>
                ): (
                    <Button type="submit">Sign In</Button>
                )}
            </form>
        </Page>
    )
}

export default SignInPage;