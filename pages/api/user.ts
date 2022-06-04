import {getSession} from 'next-auth/react';
import prisma from '../../lib/prisma';
import * as R from 'rambda';

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const session = await getSession({req});
    const body = req.body;

    const address = body.address;

    if (address) {
        await prisma.address.create({
            data: {
                street: address.street,
                city: address.city,
                region: address.region,
                zipCode: address.zipCode,
                user: {
                    connect: {
                        id: session.user.id,
                    },
                },
            },
        });
    }

    const user = await prisma.user.update({
        where: {
            email: session.user.email,
        },
        data: R.omit(['address'], body),
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
