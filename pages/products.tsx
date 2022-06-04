import prisma from '../lib/prisma';
import Products from '../components/Products';

export default function ProductsPage(props) {
    return <Products {...props} />;
}

export async function getServerSideProps(ctx) {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            slug: true,
            summary: true,
            price: true,
            discount: true,
            quantity: true,
            imgUrl: true,
        },
    });

    return {
        props: {
            products,
        },
    };
}
