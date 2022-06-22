import prisma from '../lib/prisma';

import Products from '../components/Products';
import {getSession} from 'next-auth/react';

export default function ProductsPage(props) {
    return <Products {...props} />;
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    const {error} = ctx.query;
    const products = await prisma.$queryRaw`
        select p.id, p.title, p.slug, p.summary,p.price, p.discount, p."imgUrl", case when u.id is not null then true else false end as "inCart"
        from "Product" p
                 left join "CartItem" CI
                           on p.id = CI."productId"
                 left join "Cart" C on CI."cartId" = C.id
                 left join users u on C."userId" = u.id and u.id = ${session?.user?.id}    
                 order by p.id desc
                 `;

    return {
        props: {
            error: error || null,
            products,
        },
    };
}
