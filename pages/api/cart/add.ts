import {getSession} from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const session = await getSession({req});
    const {productId} = req.body;

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        include: {
            cart: {
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            },
        },
    });

    const item = user.cart.items.find((item) => item.product.id === productId);
    if (item) {
        await prisma.cartItem.update({
            where: {
                id: item.id,
            },
            data: {
                quantity: item.quantity + 1,
            },
        });
    } else {
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
        });

        await prisma.cartItem.create({
            data: {
                product: {
                    connect: {
                        id: product.id,
                    },
                },
                cart: {
                    connect: {
                        id: user.cart.id,
                    },
                },
                quantity: 1,
                price: product.price,
                SKU: product.SKU,
                discount: product.discount,
            },
        });
    }

    res.status(200).json({...user});
}
