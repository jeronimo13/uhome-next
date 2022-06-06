import prisma from '../../../../lib/prisma';

export async function CartItemDelete(id) {
    await prisma.cartItem.delete({
        where: {
            id,
        },
    });
}

export default async function CartItem(req, res) {
    if (req.method === 'DELETE') {
        await CartItemDelete(req.query.id);
        res.status(204).end();
    }
}
