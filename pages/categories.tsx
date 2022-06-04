import {GetStaticProps} from 'next';
import prisma from '../lib/prisma';

import Categories from '../components/Categories';

export default function Example(props) {
    return <Categories {...props} />;
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const categories = await prisma.category.findMany({
        where: {
            parent: null,
        },
        select: {
            title: true,
            metaTitle: true,
            slug: true,
            imgUrl: true,
        },
    });

    return {props: {categories}};
};
