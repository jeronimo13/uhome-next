import prisma from '../lib/prisma';

async function main() {
    const parent = await prisma.category.upsert({
        create: {
            title: 'Кухня',
            metaTitle: 'Товари для кухні',
            slug: 'tovary-dlya-kuhni',
            imgUrl: 'kitchen.jpg',
        },
        update: {},
        where: {
            slug: 'tovary-dlya-kuhni',
        },
    });

    const child = await prisma.category.upsert({
        create: {
            parentCategoryId: parent.id,
            title: 'Баночки',
            metaTitle: 'Баночки',
            slug: 'banochki',
            imgUrl: 'jars/jars.jpg',
        },
        update: {},
        where: {
            slug: 'banochki',
        },
    });

    const products = [];
    for (let i = 1; i < 8; i++) {
        products.push(
            await prisma.product.create({
                data: {
                    title: `Баночка красива прозора для зберігання спецій та сортування побутової хімії ${i}`,
                    metaTitle: `Баночка ${i}`,
                    slug: `banochka-${i}`,
                    summary: `Тако собі баночка ${i}`,
                    description: `Дуже довгий текст який повністю описую такий складний товар як баночка. Це баночка № ${i}`,
                    SKU: `SKU ${i}`,
                    price: i * 100,
                    quantity: i * 10,
                    imgUrl: `jars/jars_${i}.jpg`,
                },
            })
        );
    }
    for (const product of products) {
        await prisma.categoryOnProduct.create({
            data: {
                productId: product.id,
                categoryId: child.id,
            },
        });
    }
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
