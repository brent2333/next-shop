import Page from './Page';
import Input from './components/Input';
import Field from './components/Field';
import Button from './components/Buttton';
import {useState} from 'react';
import { useRouter } from 'next/router';
import { useSignIn } from '../hooks/user';

function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signInError, signInLoading, signIn} = useSignIn();

    const handleSubmit = async (event) => {
        console.log('handleSubmit');
        event.preventDefault();
        const valid = await signIn(email, password);
        if (valid) {
            router.push('/');
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
                {signInError && <p className="text-red-700">Invalid Credentials</p>}
                {signInLoading ? (
                    <p>Loading . . .</p>
                ): (
                    <Button type="submit">Sign In</Button>
                )}
            </form>
        </Page>
    )
}

export default SignInPage;