import Page from './Page';
import Input from './components/Input';
import Field from './components/Field';
import Button from './components/Buttton';
import {useState} from 'react';
import { fetchJson } from '../lib/api';
import { useRouter } from 'next/router';

function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({loading: false, error: false});
    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus({error: false, loading: true});
        try {
        const response = await fetchJson('/api/login',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        });
        setStatus({error: false, loading: false});
        router.push('/');
    } catch (err) {
        setStatus({error: true, loading: false});
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
                {status.error && <p className="text-red-700">Invalid Credentials</p>}
                {status.loading ? (
                    <p>Loading . . .</p>
                ): (
                    <Button type="submit">Sign In</Button>
                )}
            </form>
        </Page>
    )
}

export default SignInPage;