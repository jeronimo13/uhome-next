import prisma from '../../lib/prisma';

export default function Order({order}) {
    return (
        <div>
            <div>{order.id}</div>
            <div>{order.status}</div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const {id} = context.query;

    const order = await prisma.order.findUnique({
        where: {
            id,
        },
        include: {
            items: true,
        },
    });
    return {
        props: {
            order,
        },
    };
}
