import prisma from '../lib/prisma';
import Product from '../components/Product';
import Products from '../components/Products';
import Categories from '../components/Categories';

export default function Slug(props) {
    if (props.isCategory) {
        if (props.isParent) {
            return <Categories {...props} />;
        } else {
            return <Products {...props} />;
        }
    } else {
        return <Product {...props} />;
    }
}

export async function getServerSideProps(ctx) {
    const slug: string = ctx.query['slug'];

    const category = await prisma.category.findFirst({
        where: {slug},
        select: {
            title: true,
            children: {
                select: {
                    title: true,
                    metaTitle: true,
                    slug: true,
                    imgUrl: true,
                },
            },
        },
    });

    if (category) {
        if (category.children.length === 0) {
            const products = await prisma.product.findMany({
                where: {
                    categories: {
                        some: {
                            category: {
                                slug,
                            },
                        },
                    },
                },
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
                    isCategory: true,
                    isParent: false,
                    products,
                },
            };
        }

        return {
            props: {
                isCategory: true,
                isParent: true,
                title: category.title,
                categories: category.children,
            },
        };
    }
    const product = await prisma.product.findFirst({
        where: {slug},
        select: {
            title: true,
            price: true,
            imgUrl: true,
            summary: true,
            description: true,
            categories: {
                select: {
                    category: {
                        select: {
                            title: true,
                            slug: true,
                            parent: {
                                select: {
                                    title: true,
                                    slug: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    const breadcrumbs = [];
    for (const el of product.categories) {
        breadcrumbs.push({name: el.category.title, href: `/${el.category.slug}`});
        if (el.category.parent) {
            breadcrumbs.unshift({name: el.category.parent.title, href: `/${el.category.parent.slug}`});
        }
    }
    return {
        props: {
            product: {
                ...product,
                href: '#',
                breadcrumbs: breadcrumbs.map((el, index) => ({...el, id: index + 1})),
                images: [
                    {
                        src: product.imgUrl,
                        alt: 'Two each of gray, white, and black shirts laying flat.',
                    },
                ],
                highlights: ['Hand cut and sewn locally', 'Dyed with our proprietary colors', 'Pre-washed & pre-shrunk', 'Ultra-soft 100% cotton'],
            },
        },
    };
}
