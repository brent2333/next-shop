import { fetchJson } from "../../lib/api";
import cookie from 'cookie';
async function handleLogin(req,res) {
    if (req.method !== 'POST') {
        res.status(405).end();
        return;
    }
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.method, email, password);
    try {
        const {jwt, user} = await fetchJson('http://localhost:1337/auth/local',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ identifier: email, password })
        });
        // jwt cookie        
        res.status(200).setHeader('Set-Cookie', cookie.serialize('jwt', jwt,
        {
            path: '/api',
            httpOnly: true, // expires means only session
        })).json({
            id: user.id,
            name: user.username
        })
    } catch (err) {
        console.log(err);
        res.status(401).end();
    }
}

export default handleLogin;