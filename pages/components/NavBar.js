import Link from 'next/link';
import handleUser from '../api/user';
import {useState, useEffect} from 'react';
import { fetchJson } from '../../lib/api';
import { useRouter } from 'next/router';

function NavBar() {
    const router = useRouter();
    const [user, setUser] = useState();
    useEffect(() => {
        (async () => {
           try {
            const user = await fetchJson('api/user');
            setUser(user);
           } catch(err) {
            // nothing to do, natural state
           }
        })()
    },[]);
    console.log('NAVBAR', user);
    const handleSignout = async () => {
        await fetchJson('/api/logout');
        setUser(undefined);
        router.push('/signin')
    }
    return (
        <nav className="px-2 py-1">
            <ul className="flex gap-2">
                <li>
                <Link href="/" className="font-bold text-lg">Next Shop</Link>
                </li>
                <li role="separator" className="flex-1"></li>
                {user ? (
                    <>
                    <li>
                        {user.name}
                    </li>
                    <li>
                    <button onClick={handleSignout}>Sign Out</button>
                    </li>
                    </>
                ) : (
                    <li>
                    <Link href="/signin">Sign In</Link>
                    </li>
                )}
     
            </ul>
        </nav>
    )
}
export default NavBar;