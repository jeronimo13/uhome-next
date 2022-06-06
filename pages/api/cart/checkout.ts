import {getSession} from 'next-auth/react';

export default async function handler(req, res) {
    const session = await getSession({req});
    const {cartId} = req.body;

    console.log(cartId);

    if (req.method === 'POST') {
        res.send(200);
    }
}
