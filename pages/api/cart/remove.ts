import {getSession} from 'next-auth/react';
import prisma from '../../../lib/prisma';
import {CartItemDelete} from './item/[id]';

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

    const item = user.cart?.items?.find((item) => item.product.id === productId);
    if (!item) {
        return res.status(400).json({error: `Can not find productId ${productId} in current cart.`});
    }

    if (item.quantity <= 0) {
        return res.status(400).json({error: `Quantity can't be less then 0.`});
    }

    if (item.quantity > 1) {
        await prisma.cartItem.update({
            where: {
                id: item.id,
            },
            data: {
                quantity: item.quantity - 1,
            },
        });
    }

    if (item.quantity === 0) {
        await CartItemDelete(productId);
    }

    res.status(200).json({...user});
}
