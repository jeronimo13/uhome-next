import {getSession} from 'next-auth/react';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const session = await getSession({req});
    const body = req.body;

    const user = await prisma.user.update({
        where: {
            email: session.user.email,
        },
        data: body,
        select: {
            email: true,
            name: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
        },
    });

    res.status(200).json({...user});
}
