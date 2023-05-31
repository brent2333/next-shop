import Link from 'next/link';
import { fetchJson } from '../../lib/api';
import { useRouter } from 'next/router';
import {useUser, useSignOut} from '../../hooks/user';

function NavBar() {
    const user = useUser();
    const router = useRouter()
    console.log('NAVBAR', user);
    const signOut = useSignOut();
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
                    <button onClick={signOut}>Sign Out</button>
                    </li>
                    <li>
                    <Link href="/cart">Cart</Link>
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