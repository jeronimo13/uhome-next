import {getSession} from 'next-auth/react';
import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    const session = await getSession({req});

    const products = await prisma.$queryRaw`
        select p.id, p.title, p.slug, p.summary,p.price, p.discount, p."imgUrl", p.quantity, p.code, case when u.id is not null then true else false end as "inCart"
        from "Product" p
                 left join "CartItem" CI
                           on p.id = CI."productId"
                 left join "Cart" C on CI."cartId" = C.id
                 left join users u on C."userId" = u.id and u.id = ${session?.user?.id}    
                 order by p.id desc
                 `;

    res.status(200).json({products});
}
