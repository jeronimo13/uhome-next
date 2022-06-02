import prisma from "../lib/prisma";
import users from './users.json'
import * as R from 'rambda'


async function main() {
    for (const user of users) {
        console.log(user)
        const u = await prisma.user.upsert({
            where: {
                email: user.email
            },
            update: {
                ...R.omit(['email'], user)
            },
            create: user
        })

    }
}


main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

