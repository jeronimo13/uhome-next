import {getSession} from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
    const session = await getSession({req});
    const {cartId} = req.body;

    const cart = await prisma.cart.findUnique({
        where: {
            id: cartId,
        },
        include: {
            items: true,
        },
    });

    if (cart.items.length === 0) {
        return res.status(400).json({
            error: 'Cart is empty',
        });
    }

    const subtotal = cart.items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
    const itemsDiscount = 0; //todo: calc items discount
    const shipping = 0; //todo: add shipping
    const total = subtotal - itemsDiscount + shipping;
    const discount = 0; //todo: calculate promocode discount
    const grandTotal = total - discount;

    const orderCreate = prisma.order.create({
        data: {
            status: 'NEW',
            subtotal,
            itemsDiscount,
            tax: 0,
            shipping: 0,
            total,
            promoCode: null,
            discount: 0,
            grandTotal,
            firstName: cart.firstName,
            lastName: cart.lastName,
            email: cart.email,
            phoneNumber: cart.phoneNumber,
            street: cart.street,
            city: cart.city,
            region: cart.region,
            zipCode: cart.zipCode,
            items: {
                create: cart.items.map((item: any) => ({
                    productId: item.productId,
                    SKU: item.SKU,
                    price: item.price,
                    discount: item.discount,
                    quantity: item.quantity,
                })),
            },
            transactions: {
                create: [
                    {
                        userId: session.user.id,
                        code: '',
                        type: 'DEBIT',
                        status: 'PENDING',
                        mode: 'ONLINE',
                    },
                ],
            },
        },
    });

    const cartItemsDelete = prisma.cartItem.deleteMany({
        where: {
            cartId,
        },
    });

    const cartDelete = prisma.cart.delete({
        where: {
            id: cartId,
        },
    });

    const [order] = await prisma.$transaction([orderCreate, cartItemsDelete, cartDelete]);

    if (req.method === 'POST') {
        res.json({
            order,
        });
    }
}
