import {getSession} from 'next-auth/react';
import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
    const session = await getSession({req});
    const {id} = req.query;
    const {phoneNumber, email, firstName, lastName} = req.body;

    console.log(id);
    console.log(phoneNumber, email, firstName, lastName);

    //todo: add auth

    await prisma.cart.update({
        where: {
            id,
        },
        data: {
            firstName,
            lastName,
            email,
            phoneNumber,
        },
    });

    res.status(204).end();
}
