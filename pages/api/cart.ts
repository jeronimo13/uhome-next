import {getSession} from 'next-auth/react';
import prisma from '../../lib/prisma';

export async function getCart({userId}) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            addresses: true,
        },
    });

    const address = user.addresses[0];

    return await prisma.cart.upsert({
        create: {
            user: {
                connect: {
                    id: user.id,
                },
            },
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            street: address.street,
            city: address.city,
            region: address.region,
            zipCode: address.zipCode,
        },
        where: {
            userId: user.id,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
        update: {},
    });
}

export default async function handler(req, res) {
    const {user: userSession} = await getSession({req});

    const cart = await getCart({userId: userSession.id});

    res.status(200).json({cart});
}
